import { useState, useEffect } from 'react';
import { MapPin, Phone, Users, CheckCircle, Home as HomeIcon, Clock, Navigation } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import BusLocationPin from '../icons/BusLocationPin';
import wairoaMap from 'figma:asset/802c9fc80a14e644034d432bee88218b1476cba7.png';

interface Student {
  id: number;
  name: string;
  parentName: string;
  phone: string;
  pickupAddress: string;
  dropoffAddress: string;
  scheduledTime: string;
  photoUrl?: string;
  status: 'pending' | 'on-board' | 'dropped' | 'no-show';
}

interface DriverLiveMapProps {
  students: Student[];
  onDropOff: (studentId: number) => void;
  onNavigateToStudents: () => void;
}

export default function DriverLiveMap({ students, onDropOff, onNavigateToStudents }: DriverLiveMapProps) {
  // Only track students who are on-board (already checked in = already picked up)
  const onBoardStudents = students.filter(s => s.status === 'on-board');
  
  // Track who has been dropped at school
  const [droppedAtSchool, setDroppedAtSchool] = useState<Set<number>>(new Set());
  
  // Driver position and route simulation
  const [driverPosition, setDriverPosition] = useState({ x: 20, y: 30 });
  const [isMoving, setIsMoving] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Create route stops - students are already picked up when they're "on-board"
  const pickupLocations = onBoardStudents.map((student, index) => ({
    id: student.id,
    name: student.name,
    x: 30 + (index * 10),
    y: 35 + (index * 7),
  }));

  const schoolLocation = { x: 70, y: 70 };

  // Start simulation - bus moves from last pickup to school
  useEffect(() => {
    if (onBoardStudents.length > 0 && !hasStarted) {
      setHasStarted(true);
      // Start at the last pickup location (where you picked up the last student)
      const lastPickup = pickupLocations[pickupLocations.length - 1];
      setDriverPosition({ x: lastPickup.x, y: lastPickup.y });
      
      // Start moving to school after a moment
      setTimeout(() => {
        setIsMoving(true);
      }, 1000);
    }
  }, [onBoardStudents.length, hasStarted]);

  // Animate bus to school
  useEffect(() => {
    if (!isMoving) return;

    const interval = setInterval(() => {
      setDriverPosition(prev => {
        const dx = schoolLocation.x - prev.x;
        const dy = schoolLocation.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Arrived at school
        if (distance < 0.5) {
          setIsMoving(false);
          return { x: schoolLocation.x, y: schoolLocation.y };
        }

        // Move toward school
        const speed = 0.2;
        return {
          x: prev.x + (dx / distance) * speed,
          y: prev.y + (dy / distance) * speed
        };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isMoving]);

  const handleDropAtSchool = (studentId: number) => {
    setDroppedAtSchool(prev => new Set([...prev, studentId]));
    setTimeout(() => onDropOff(studentId), 500);
  };

  const inVanCount = onBoardStudents.filter(s => !droppedAtSchool.has(s.id)).length;
  const atSchoolCount = droppedAtSchool.size;
  const progressPercent = onBoardStudents.length > 0 ? Math.round((atSchoolCount / onBoardStudents.length) * 100) : 0;

  // Check if bus has arrived at school (close enough)
  const arrivedAtSchool = Math.sqrt(
    Math.pow(driverPosition.x - schoolLocation.x, 2) + 
    Math.pow(driverPosition.y - schoolLocation.y, 2)
  ) < 2;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Stats Header with Progress */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
            <p className="text-2xl font-bold text-blue-600 text-center">{inVanCount}</p>
            <p className="text-xs text-blue-700 text-center">In Van</p>
          </div>
          <div className="bg-green-50 rounded-xl p-3 border border-green-200">
            <p className="text-2xl font-bold text-green-600 text-center">{atSchoolCount}</p>
            <p className="text-xs text-green-700 text-center">At School</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        {onBoardStudents.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-gray-600 font-semibold">Journey Progress</span>
              <span className="text-xs font-bold text-blue-600">{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className="h-2.5 rounded-full transition-all duration-500"
                style={{ 
                  width: `${progressPercent}%`, 
                  background: 'linear-gradient(90deg, #2F6F9F 0%, #5699D2 100%)' 
                }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Journey Map */}
        {onBoardStudents.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
            <div 
              className="relative overflow-hidden"
              style={{ height: '320px' }}
            >
              {/* Wairoa Map Background */}
              <ImageWithFallback 
                src={wairoaMap}
                alt="Wairoa Map"
                className="absolute inset-0 w-full h-full"
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transform: 'scale(1.5)',
                  transformOrigin: 'center center'
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/5"></div>

              {/* Route Path - show all pickups completed, heading to school */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                {/* Lines between pickup locations (all completed/green) */}
                {pickupLocations.slice(0, -1).map((pickup, index) => {
                  const nextPickup = pickupLocations[index + 1];
                  return (
                    <line
                      key={`pickup-line-${index}`}
                      x1={`${pickup.x}%`}
                      y1={`${pickup.y}%`}
                      x2={`${nextPickup.x}%`}
                      y2={`${nextPickup.y}%`}
                      stroke="#10b981"
                      strokeWidth="3"
                      opacity="0.6"
                    />
                  );
                })}
                
                {/* Line from last pickup to school */}
                {pickupLocations.length > 0 && (
                  <line
                    x1={`${pickupLocations[pickupLocations.length - 1].x}%`}
                    y1={`${pickupLocations[pickupLocations.length - 1].y}%`}
                    x2={`${schoolLocation.x}%`}
                    y2={`${schoolLocation.y}%`}
                    stroke={arrivedAtSchool ? '#10b981' : '#3b82f6'}
                    strokeWidth="3"
                    strokeDasharray={arrivedAtSchool ? '0' : '8,4'}
                    opacity="0.7"
                  />
                )}
              </svg>

              {/* Pickup Location Markers (all completed) */}
              {pickupLocations.map((pickup, index) => (
                <div
                  key={`pickup-${pickup.id}`}
                  className="absolute z-10"
                  style={{
                    left: `${pickup.x}%`,
                    top: `${pickup.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="relative">
                    <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-3 border-white">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    {/* Student Name Label */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-green-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg">
                      {pickup.name}
                    </div>
                  </div>
                </div>
              ))}

              {/* School Marker */}
              <div
                className="absolute z-10"
                style={{
                  left: `${schoolLocation.x}%`,
                  top: `${schoolLocation.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="relative">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border-4 border-white ${
                    arrivedAtSchool ? 'bg-green-500' : 'bg-orange-500 animate-pulse'
                  }`}>
                    <HomeIcon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg ${
                    arrivedAtSchool ? 'bg-green-500' : 'bg-orange-500'
                  } text-white`}>
                    School
                  </div>
                </div>
              </div>

              {/* Driver Bus Position */}
              <div
                className="absolute z-20 transition-all duration-100"
                style={{
                  left: `${driverPosition.x}%`,
                  top: `${driverPosition.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="relative">
                  <BusLocationPin className="w-16 h-16 drop-shadow-2xl" />
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                    You are here
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1.5 rounded-full shadow-lg">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold">{arrivedAtSchool ? 'AT SCHOOL' : 'EN ROUTE'}</span>
                </div>
              </div>

              {/* Map Label */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                <p className="text-xs font-semibold text-gray-700">
                  {arrivedAtSchool ? 'Arrived at School' : 'Heading to School'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Students in Van - Ready to Drop Off */}
        {onBoardStudents.length > 0 ? (
          <div className="space-y-3 pb-20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Students in Van ({inVanCount})
              </h3>
              {arrivedAtSchool && inVanCount > 0 && (
                <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  Ready to drop off
                </span>
              )}
            </div>
            
            {onBoardStudents.map((student, index) => {
              const isDropped = droppedAtSchool.has(student.id);

              return (
                <div 
                  key={student.id}
                  className={`bg-white rounded-xl p-4 shadow-sm border-2 transition-all ${
                    isDropped ? 'border-green-200 bg-green-50/50 opacity-75' : 'border-blue-200 bg-blue-50/30'
                  }`}
                >
                  {/* Student Info */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ 
                          background: isDropped ? '#10b981' : '#3b82f6'
                        }}
                      >
                        <span className="text-white font-bold">
                          {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      {isDropped && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{student.name}</h4>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                          Picked up from {student.pickupAddress}
                        </p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <HomeIcon className="w-3.5 h-3.5 text-orange-500" />
                          Drop at {student.dropoffAddress}
                        </p>
                        <p className="text-xs text-gray-500">
                          Parent: {student.parentName}
                        </p>
                      </div>
                    </div>

                    {/* Call Button */}
                    <a 
                      href={`tel:${student.phone}`}
                      className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors flex-shrink-0"
                    >
                      <Phone className="w-5 h-5 text-white" />
                    </a>
                  </div>

                  {/* Action Button */}
                  {!isDropped ? (
                    <button
                      onClick={() => handleDropAtSchool(student.id)}
                      disabled={!arrivedAtSchool}
                      className={`w-full py-3 px-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 ${
                        arrivedAtSchool
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <HomeIcon className="w-5 h-5" />
                      {arrivedAtSchool ? 'Drop at School' : 'Heading to School...'}
                    </button>
                  ) : (
                    <div className="w-full py-3 px-4 bg-green-100 text-green-700 rounded-xl font-bold flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Dropped at School
                    </div>
                  )}
                </div>
              );
            })}

            {/* All Complete Message */}
            {atSchoolCount === onBoardStudents.length && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <p className="font-bold text-green-900 text-lg mb-1">Journey Complete!</p>
                <p className="text-green-700 text-sm">All students dropped at school</p>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-900 font-bold text-lg mb-2">No Students Checked In</p>
            <p className="text-gray-500 mb-6">Check in students to start tracking</p>
            <button
              onClick={onNavigateToStudents}
              className="px-8 py-3.5 text-white rounded-xl font-bold shadow-lg"
              style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
            >
              Go to Students
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-2 max-w-lg mx-auto">
          <button
            onClick={onNavigateToStudents}
            className="flex flex-col items-center py-4 px-4 text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <Users className="w-6 h-6 mb-1" />
            <span className="text-sm font-semibold">Students</span>
          </button>
          <button
            className="flex flex-col items-center py-4 px-4 text-white"
            style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
          >
            <MapPin className="w-6 h-6 mb-1" />
            <span className="text-sm font-semibold">Live Map</span>
          </button>
        </div>
      </div>
    </div>
  );
}