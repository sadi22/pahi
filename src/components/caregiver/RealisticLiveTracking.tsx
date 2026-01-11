import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Minus, MapPin, Home as HomeIcon, School, Navigation, X, CheckCircle } from 'lucide-react';
import wairoaMap from 'figma:asset/322dabe9429e6d40a0d2ade9a4f27fa62bfa1795.png';
import { toast } from 'sonner@2.0.3';

interface RealisticLiveTrackingProps {
  onNavigate?: (page: string) => void;
  activeRide?: any;
  students?: any[];
  onDropOff?: (studentId: number) => void;
  onNavigateToStudents?: () => void;
  onBack?: () => void;
}

interface Location {
  x: string;
  y: string;
  name: string;
  type: 'school' | 'pickup' | 'vehicle' | 'landmark';
  color: string;
}

export default function RealisticLiveTracking({ 
  onNavigate, 
  activeRide, 
  students, 
  onDropOff, 
  onNavigateToStudents,
  onBack
}: RealisticLiveTrackingProps) {
  const [progress, setProgress] = useState(0);
  const [zoom, setZoom] = useState(1.3);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [etaMinutes, setEtaMinutes] = useState(12);
  const [showNextStop, setShowNextStop] = useState(true);
  const [showRouteProgress, setShowRouteProgress] = useState(true);
  const [pickedUpStudents, setPickedUpStudents] = useState<number[]>([]); // Track picked up students

  // Add state to track dropped off students
  const [droppedOffStudents, setDroppedOffStudents] = useState<number[]>([]);

  const childName = activeRide?.childName || 'Emma Johnson';
  const rideType = activeRide?.rideType || 'pickup'; // Get ride type from activeRide
  const schoolName = activeRide?.school || 'Wairoa Primary School'; // Get school from activeRide
  
  // Check if we're in driver mode
  const isDriverMode = !!students;

  // Force route progress to always show in driver mode
  useEffect(() => {
    if (isDriverMode) {
      setShowRouteProgress(true);
    }
  }, [isDriverMode]);

  // Map schools to their actual positions on the map
  const schoolPositions: Record<string, { x: string, y: string }> = {
    'Wairoa Primary School': { x: '58%', y: '49%' }, // Actual position on map image
    'Wairoa College': { x: '15%', y: '40%' }, // Actual position on map image
    'St Joseph\'s School': { x: '55%', y: '35%' }, // Estimated position
    'Te Kura Kaupapa Māori o Te Whānau a Apanui': { x: '60%', y: '75%' }, // Estimated position
  };

  // Home position (default pickup location)
  const homePosition = { x: '15%', y: '70%' };

  // Get start and end positions based on ride type
  const getStartPosition = () => {
    if (rideType === 'pickup') {
      return homePosition; // Start at home for pickup
    } else {
      return schoolPositions[schoolName] || schoolPositions['Wairoa Primary School']; // Start at school for dropoff
    }
  };

  const getEndPosition = () => {
    if (rideType === 'pickup') {
      return schoolPositions[schoolName] || schoolPositions['Wairoa Primary School']; // End at school for pickup
    } else {
      return homePosition; // End at home for dropoff
    }
  };

  const startPosition = getStartPosition();
  const endPosition = getEndPosition();

  // Get checked-in students for driver mode
  const checkedInStudents = students?.filter(s => s.status === 'on-board') || [];
  
  // For driver mode, override end position to use the actual school from students
  const actualEndPosition = isDriverMode && checkedInStudents.length > 0
    ? (schoolPositions[checkedInStudents[0]?.dropoffAddress] || schoolPositions['Wairoa Primary School'])
    : endPosition;
  
  // Group students by their destination school (for multi-school routes)
  const studentsBySchool = isDriverMode 
    ? checkedInStudents.reduce((acc, student) => {
        const school = student.dropoffAddress;
        if (!acc[school]) acc[school] = [];
        acc[school].push(student);
        return acc;
      }, {} as Record<string, typeof checkedInStudents>)
    : {};
  
  const schoolDestinations = Object.keys(studentsBySchool);

  // Create dynamic locations based on checked-in students
  const getDynamicLocations = (): Location[] => {
    const baseLocations: Location[] = [
      { x: '40%', y: '45%', name: 'Wairoa Primary School', type: 'school', color: 'blue-600' },
      { x: '30%', y: '20%', name: 'Wairoa College', type: 'school', color: 'purple-600' },
      { x: '55%', y: '35%', name: 'St Joseph\'s School', type: 'school', color: 'rose-600' },
      { x: '60%', y: '75%', name: 'Te Kura Kaupapa Māori o Te Whānau a Apanui', type: 'school', color: 'emerald-600' },
    ];

    if (isDriverMode && checkedInStudents.length > 0) {
      // Add pickup locations for each checked-in student
      const pickupLocations: Location[] = checkedInStudents.map((student, index) => {
        // Spread pickups across different areas
        const positions = [
          { x: '15%', y: '70%' },
          { x: '20%', y: '55%' },
          { x: '25%', y: '40%' },
          { x: '50%', y: '80%' },
          { x: '65%', y: '50%' },
        ];
        const pos = positions[index % positions.length];
        
        return {
          x: pos.x,
          y: pos.y,
          name: student.name,
          type: 'pickup' as const,
          color: 'gray-900'
        };
      });
      
      return [...pickupLocations, ...baseLocations];
    }

    // Default caregiver mode location
    return [
      { x: '15%', y: '70%', name: 'Pickup', type: 'pickup', color: 'gray-900' },
      ...baseLocations
    ];
  };

  const locations = getDynamicLocations();

  // Debug: Log locations to check if multiple students are showing
  console.log('Driver Mode:', isDriverMode);
  console.log('Checked-in Students:', checkedInStudents);
  console.log('Generated Locations:', locations);

  // Create a realistic road-following path through all pickup points
  const getRoadPath = () => {
    if (isDriverMode && checkedInStudents.length > 0) {
      // Define student pickup positions
      const studentPositions = checkedInStudents.map((_, index) => {
        const positions = [
          { x: 15, y: 70 },  // Emma Johnson
          { x: 20, y: 55 },  // Liam Johnson
          { x: 25, y: 40 },  // Olivia Smith
          { x: 50, y: 80 },  // Student 4
          { x: 65, y: 50 },  // Student 5
        ];
        return positions[index % positions.length];
      });

      // Create realistic road waypoints that follow street patterns
      const waypoints: Array<{x: number, y: number}> = [];
      
      // Start at first student
      waypoints.push(studentPositions[0]);
      
      // For each student, create a path that strictly follows horizontal/vertical roads
      for (let i = 0; i < studentPositions.length - 1; i++) {
        const current = studentPositions[i];
        const next = studentPositions[i + 1];
        
        const dx = next.x - current.x;
        const dy = next.y - current.y;
        
        // Decide whether to go horizontal-then-vertical or vertical-then-horizontal
        // This simulates following a grid street network
        const goHorizontalFirst = Math.abs(dx) > Math.abs(dy);
        
        if (goHorizontalFirst) {
          // Move horizontally first (along one street)
          const steps = Math.ceil(Math.abs(dx) / 5); // Create waypoints every 5%
          for (let step = 1; step <= steps; step++) {
            waypoints.push({
              x: current.x + (dx * step / steps),
              y: current.y
            });
          }
          // Then move vertically (turn and go down another street)
          const vSteps = Math.ceil(Math.abs(dy) / 5);
          for (let step = 1; step <= vSteps; step++) {
            waypoints.push({
              x: next.x,
              y: current.y + (dy * step / vSteps)
            });
          }
        } else {
          // Move vertically first
          const steps = Math.ceil(Math.abs(dy) / 5);
          for (let step = 1; step <= steps; step++) {
            waypoints.push({
              x: current.x,
              y: current.y + (dy * step / steps)
            });
          }
          // Then move horizontally
          const hSteps = Math.ceil(Math.abs(dx) / 5);
          for (let step = 1; step <= hSteps; step++) {
            waypoints.push({
              x: current.x + (dx * step / hSteps),
              y: next.y
            });
          }
        }
      }
      
      // Add final destination waypoint (last student position)
      waypoints.push(studentPositions[studentPositions.length - 1]);
      
      // Now route to each school destination based on which students go where
      let currentPosition = studentPositions[studentPositions.length - 1];
      
      // Visit each school that has students
      schoolDestinations.forEach((schoolName) => {
        const schoolPos = schoolPositions[schoolName] 
          ? { x: parseFloat(schoolPositions[schoolName].x), y: parseFloat(schoolPositions[schoolName].y) }
          : { x: 58, y: 49 }; // Default to Wairoa Primary School
        
        const dx = schoolPos.x - currentPosition.x;
        const dy = schoolPos.y - currentPosition.y;
        
        // Create path to this school
        const goHorizontalFirst = Math.abs(dx) > Math.abs(dy);
        
        if (goHorizontalFirst) {
          const hSteps = Math.ceil(Math.abs(dx) / 5);
          for (let step = 1; step <= hSteps; step++) {
            waypoints.push({
              x: currentPosition.x + (dx * step / hSteps),
              y: currentPosition.y
            });
          }
          const vSteps = Math.ceil(Math.abs(dy) / 5);
          for (let step = 1; step <= vSteps; step++) {
            waypoints.push({
              x: schoolPos.x,
              y: currentPosition.y + (dy * step / vSteps)
            });
          }
        } else {
          const vSteps = Math.ceil(Math.abs(dy) / 5);
          for (let step = 1; step <= vSteps; step++) {
            waypoints.push({
              x: currentPosition.x,
              y: currentPosition.y + (dy * step / vSteps)
            });
          }
          const hSteps = Math.ceil(Math.abs(dx) / 5);
          for (let step = 1; step <= hSteps; step++) {
            waypoints.push({
              x: currentPosition.x + (dx * step / hSteps),
              y: schoolPos.y
            });
          }
        }
        
        waypoints.push(schoolPos);
        currentPosition = schoolPos; // Update current position for next school
      });
      
      return waypoints;
    }
    
    // Dynamic caregiver path based on selected school and ride type
    const startX = parseFloat(startPosition.x);
    const startY = parseFloat(startPosition.y);
    const endX = parseFloat(endPosition.x);
    const endY = parseFloat(endPosition.y);
    
    const waypoints: Array<{x: number, y: number}> = [];
    waypoints.push({ x: startX, y: startY });
    
    // Calculate path following grid pattern
    const dx = endX - startX;
    const dy = endY - startY;
    
    // Decide route direction based on which is greater
    const goHorizontalFirst = Math.abs(dx) > Math.abs(dy);
    
    if (goHorizontalFirst) {
      // Move horizontally first
      const steps = Math.ceil(Math.abs(dx) / 5);
      for (let step = 1; step <= steps; step++) {
        waypoints.push({
          x: startX + (dx * step / steps),
          y: startY
        });
      }
      // Then move vertically
      const vSteps = Math.ceil(Math.abs(dy) / 5);
      for (let step = 1; step <= vSteps; step++) {
        waypoints.push({
          x: endX,
          y: startY + (dy * step / vSteps)
        });
      }
    } else {
      // Move vertically first
      const steps = Math.ceil(Math.abs(dy) / 5);
      for (let step = 1; step <= steps; step++) {
        waypoints.push({
          x: startX,
          y: startY + (dy * step / steps)
        });
      }
      // Then move horizontally
      const hSteps = Math.ceil(Math.abs(dx) / 5);
      for (let step = 1; step <= hSteps; step++) {
        waypoints.push({
          x: startX + (dx * step / hSteps),
          y: endY
        });
      }
    }
    
    waypoints.push({ x: endX, y: endY });
    
    return waypoints;
  };

  const roadPath = getRoadPath();

  // Calculate bus position along the road path
  const getBusPosition = () => {
    const pathProgress = progress / 100;
    const totalSegments = roadPath.length - 1;
    const currentSegment = Math.min(Math.floor(pathProgress * totalSegments), totalSegments - 1);
    const segmentProgress = (pathProgress * totalSegments) - currentSegment;

    const start = roadPath[currentSegment];
    const end = roadPath[currentSegment + 1] || start;

    const x = start.x + (end.x - start.x) * segmentProgress;
    const y = start.y + (end.y - start.y) * segmentProgress;

    return { x: `${x}%`, y: `${y}%` };
  };

  const busPosition = getBusPosition();
  
  // Get current student name for bus label based on progress
  const getCurrentStudentIndex = () => {
    if (isDriverMode && checkedInStudents.length > 0) {
      const progressPerStudent = 100 / checkedInStudents.length;
      return Math.min(
        Math.floor(progress / progressPerStudent),
        checkedInStudents.length - 1
      );
    }
    return 0;
  };
  
  const currentStudentIndex = getCurrentStudentIndex();
  
  // Get next stop name - dynamic based on pickup status
  const getNextStopName = () => {
    if (isDriverMode && checkedInStudents.length > 0) {
      // DRIVER MODE with multiple students
      // Find the next student who hasn't been picked up yet
      const nextStudent = checkedInStudents.find(s => !pickedUpStudents.includes(s.id));
      
      if (nextStudent) {
        // Still have students to pick up - show next student's name
        return nextStudent.name;
      } else {
        // All students picked up, next stop is school
        return schoolDestinations[0] || 'School';
      }
    }
    
    // CAREGIVER MODE - show the actual destination
    if (rideType === 'pickup') {
      // For pickup rides, the destination is the school
      return schoolName;
    } else {
      // For dropoff rides, the destination is home
      return 'Home';
    }
  };
  
  const currentStudentName = getNextStopName();

  // Simulate ride progress - FASTER!
  useEffect(() => {
    if (progress >= 100) return;
    const timer = setInterval(() => {
      setProgress(p => Math.min(p + 1, 100)); // Changed from 0.5 to 1 (2x faster)
    }, 400); // Changed from 800ms to 400ms (2x faster)
    return () => clearInterval(timer);
  }, [progress]);

  // Auto-pickup students as bus progresses in driver mode
  useEffect(() => {
    if (!isDriverMode || checkedInStudents.length === 0) return;
    
    // Get current bus position in numeric format
    const busX = parseFloat(busPosition.x);
    const busY = parseFloat(busPosition.y);
    
    // Check each student and mark as picked up when bus is close
    checkedInStudents.forEach((student, index) => {
      if (pickedUpStudents.includes(student.id)) return; // Already picked up
      
      // Get student position
      const positions = [
        { x: 15, y: 70 },  // Emma Johnson
        { x: 20, y: 55 },  // Liam Johnson
        { x: 25, y: 40 },  // Olivia Smith
        { x: 50, y: 80 },  // Student 4
        { x: 65, y: 50 },  // Student 5
      ];
      const studentPos = positions[index % positions.length];
      
      // Calculate distance between bus and student
      const distance = Math.sqrt(
        Math.pow(busX - studentPos.x, 2) + Math.pow(busY - studentPos.y, 2)
      );
      
      // Pickup when bus is within 3% distance of student
      if (distance < 3) {
        setPickedUpStudents(prev => [...prev, student.id]);
        // Show notification to driver
        toast.success(`✅ Picked up ${student.name}`, {
          duration: 3000,
        });
      }
    });
  }, [progress, isDriverMode, checkedInStudents, pickedUpStudents, busPosition]);

  // Auto-dropoff students when bus reaches their destination school
  useEffect(() => {
    if (!isDriverMode || !onDropOff || checkedInStudents.length === 0) return;
    
    // Get current bus position in numeric format
    const busX = parseFloat(busPosition.x);
    const busY = parseFloat(busPosition.y);
    
    // Check each student and mark as dropped off when bus reaches their school
    checkedInStudents.forEach((student) => {
      if (droppedOffStudents.includes(student.id)) return; // Already dropped off
      if (!pickedUpStudents.includes(student.id)) return; // Not picked up yet
      
      // Get school position
      const schoolPos = schoolPositions[student.dropoffAddress] || schoolPositions['Wairoa Primary School'];
      const schoolX = parseFloat(schoolPos.x);
      const schoolY = parseFloat(schoolPos.y);
      
      // Calculate distance between bus and school
      const distance = Math.sqrt(
        Math.pow(busX - schoolX, 2) + Math.pow(busY - schoolY, 2)
      );
      
      // Drop off when bus is within 5% distance of school
      if (distance < 5) {
        setDroppedOffStudents(prev => [...prev, student.id]);
        onDropOff(student.id); // Call the parent handler to update status
        toast.success(`Dropped off ${student.name} at ${student.dropoffAddress}`);
      }
    });
  }, [progress, isDriverMode, checkedInStudents, droppedOffStudents, pickedUpStudents, busPosition, onDropOff]);

  // Update ETA
  useEffect(() => {
    setEtaMinutes(Math.max(1, Math.ceil(12 * (1 - progress / 100))));
  }, [progress]);

  // Zoom handlers
  const handleZoomIn = () => setZoom(z => Math.min(z + 0.3, 2.5));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.3, 1));
  const handleRecenter = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Zoom to location when clicked
  const handleLocationClick = (location: Location) => {
    const container = { width: window.innerWidth, height: window.innerHeight };
    const targetX = parseFloat(location.x) / 100;
    const targetY = parseFloat(location.y) / 100;
    
    const newZoom = 1.8;
    const offsetX = (container.width / 2 - targetX * container.width) * (newZoom - 1);
    const offsetY = (container.height / 2 - targetY * container.height) * (newZoom - 1);
    
    setZoom(newZoom);
    setPan({ x: offsetX, y: offsetY });
  };

  // Get marker color based on location type and color string
  const getMarkerColor = (colorString: string) => {
    const colorMap: Record<string, string> = {
      'blue-600': '#2563eb',
      'purple-600': '#9333ea',
      'rose-600': '#e11d48',
      'emerald-600': '#059669',
      'gray-900': '#111827',
    };
    return colorMap[colorString] || '#2563eb';
  };

  // Pan handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX - pan.x,
      y: e.touches[0].clientY - pan.y
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      e.preventDefault();
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLButtonElement || (e.target as HTMLElement).closest('button')) {
      return;
    }
    setIsDragging(true);
    setDragStart({
      x: e.clientX - pan.x,
      y: e.clientY - pan.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50">
      {/* Map Container - Takes full space */}
      <div 
        className="flex-1 relative overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Map Image with professional shadow */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out flex items-center justify-center"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transformOrigin: 'center center',
            willChange: 'transform'
          }}
        >
          <div className="relative shadow-2xl rounded-lg overflow-hidden">
            <img 
              src={wairoaMap} 
              alt="Wairoa Map" 
              className="w-full h-full object-contain pointer-events-none"
              draggable={false}
              style={{ maxHeight: '100vh' }}
            />

            {/* Location Markers - Better spaced */}
            <div className="absolute inset-0">
              {/* Invisible clickable zones for red markers on the map image */}
              {/* Wairoa Business Hub (red marker - left upper area) */}
              <button
                className="absolute bg-transparent rounded-full transition-all active:scale-95"
                style={{ left: '33%', top: '27%', width: '100px', height: '100px', transform: 'translate(-50%, -50%)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLocationClick({ x: '33%', y: '27%', name: 'Wairoa Business Hub', type: 'landmark', color: 'blue-600' });
                }}
              />
              
              {/* Wairoa College (red marker - left lower area) */}
              <button
                className="absolute bg-transparent rounded-full transition-all active:scale-95"
                style={{ left: '15%', top: '40%', width: '100px', height: '100px', transform: 'translate(-50%, -50%)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLocationClick({ x: '15%', y: '40%', name: 'Wairoa College', type: 'school', color: 'blue-600' });
                }}
              />
              
              {/* The Wairoa Business Association (red marker - upper right area) */}
              <button
                className="absolute bg-transparent rounded-full transition-all active:scale-95"
                style={{ left: '63%', top: '30%', width: '100px', height: '100px', transform: 'translate(-50%, -50%)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLocationClick({ x: '63%', y: '30%', name: 'Wairoa Business Association', type: 'landmark', color: 'blue-600' });
                }}
              />
              
              {/* Wairoa Primary School (red marker - center right) */}
              <button
                className="absolute bg-transparent rounded-full transition-all active:scale-95"
                style={{ left: '58%', top: '49%', width: '100px', height: '100px', transform: 'translate(-50%, -50%)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLocationClick({ x: '58%', y: '49%', name: 'Wairoa Primary School', type: 'school', color: 'blue-600' });
                }}
              />
              
              {/* Mclean Street Store (blue marker - lower center) */}
              <button
                className="absolute bg-transparent rounded-full transition-all active:scale-95"
                style={{ left: '68%', top: '85%', width: '100px', height: '100px', transform: 'translate(-50%, -50%)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLocationClick({ x: '68%', y: '85%', name: 'Mclean Street Store', type: 'landmark', color: 'blue-600' });
                }}
              />

              {/* Vehicle (Bus) - Mid route */}
              <div className="absolute pointer-events-none" style={{ left: busPosition.x, top: busPosition.y }}>
                <div className="relative">
                  {/* Blue Bus Icon - Smaller, cleaner design */}
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center border-3 border-white shadow-lg relative z-10">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 16C4 16.88 4.39 17.67 5 18.22V20C5 20.55 5.45 21 6 21H7C7.55 21 8 20.55 8 20V19H16V20C16 20.55 16.45 21 17 21H18C18.55 21 19 20.55 19 20V18.22C19.61 17.67 20 16.88 20 16V6C20 2.5 16.42 2 12 2C7.58 2 4 2.5 4 6V16ZM6.5 7.5C6.5 6.67 7.17 6 8 6H16C16.83 6 17.5 6.67 17.5 7.5V12.5C17.5 13.33 16.83 14 16 14H8C7.17 14 6.5 13.33 6.5 12.5V7.5ZM7.5 16C7.5 15.17 8.17 14.5 9 14.5C9.83 14.5 10.5 15.17 10.5 16C10.5 16.83 9.83 17.5 9 17.5C8.17 17.5 7.5 16.83 7.5 16ZM13.5 16C13.5 15.17 14.17 14.5 15 14.5C15.83 14.5 16.5 15.17 16.5 16C16.5 16.83 15.83 17.5 15 17.5C14.17 17.5 13.5 16.83 13.5 16Z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Start Point Marker with Location Name */}
              {!isDriverMode && (
                <div className="absolute pointer-events-none" style={{ left: startPosition.x, top: startPosition.y }}>
                  <div className="relative">
                    {/* Pickup Marker - Home Icon with Blue */}
                    <div className="w-9 h-9 rounded-full flex items-center justify-center border-3 border-white shadow-lg relative z-10"
                      style={{ backgroundColor: rideType === 'pickup' ? '#2563EB' : '#DC2626' }}>
                      {rideType === 'pickup' ? (
                        <HomeIcon className="w-5 h-5 text-white" strokeWidth={2.5} />
                      ) : (
                        <School className="w-5 h-5 text-white" strokeWidth={2.5} />
                      )}
                    </div>
                    {/* Compact Location Label */}
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <div className="text-slate-800 px-2 py-0.5 rounded shadow-lg border" style={{ 
                        backgroundColor: rideType === 'pickup' ? '#1D4ED8' : '#B91C1C',
                        borderColor: rideType === 'pickup' ? '#1E40AF' : '#991B1B'
                      }}>
                        <p className="text-white text-xs font-semibold" style={{ fontSize: '10px' }}>
                          {rideType === 'pickup' ? 'Home' : schoolName}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Multiple Student Pickup Markers (Driver Mode Only) */}
              {isDriverMode && checkedInStudents.map((student, index) => {
                const positions = [
                  { x: '15%', y: '70%' },
                  { x: '20%', y: '55%' },
                  { x: '25%', y: '40%' },
                  { x: '50%', y: '80%' },
                  { x: '65%', y: '50%' },
                ];
                const pos = positions[index % positions.length];
                const isPickedUp = pickedUpStudents.includes(student.id);
                
                return (
                  <div key={student.id} className="absolute pointer-events-none" style={{ left: pos.x, top: pos.y }}>
                    <div className="relative">
                      {/* Student Pickup Marker - Blue Home Icon */}
                      <div 
                        className={`w-9 h-9 rounded-full flex items-center justify-center border-3 border-white shadow-lg relative z-10 transition-all ${isPickedUp ? 'opacity-50' : ''}`}
                        style={{ backgroundColor: '#2563EB' }}
                      >
                        <HomeIcon className="w-5 h-5 text-white" strokeWidth={2.5} />
                      </div>
                      {/* Student Name Label */}
                      <div className="absolute top-11 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <div className={`backdrop-blur-sm text-slate-800 px-2 py-1 rounded-lg shadow-lg border ${isPickedUp ? 'bg-blue-50/95 border-blue-200' : 'bg-blue-50/95 border-blue-200'}`}>
                          <p className="font-bold text-xs" style={{ color: '#2563EB', fontSize: '9px' }}>
                            {student.name}
                          </p>
                          <p className="text-xs text-slate-600" style={{ fontSize: '8px' }}>
                            {isPickedUp ? 'Picked up' : 'Home'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* End Point Marker with Location Name */}
              {!isDriverMode && (
                <div className="absolute pointer-events-none" style={{ left: actualEndPosition.x, top: actualEndPosition.y }}>
                  <div className="relative">
                    {/* Dropoff Marker - School Icon with Red */}
                    <div className="w-9 h-9 rounded-full flex items-center justify-center border-3 border-white shadow-lg relative z-10"
                      style={{ backgroundColor: rideType === 'pickup' ? '#DC2626' : '#2563EB' }}>
                      {rideType === 'pickup' ? (
                        <School className="w-5 h-5 text-white" strokeWidth={2.5} />
                      ) : (
                        <HomeIcon className="w-5 h-5 text-white" strokeWidth={2.5} />
                      )}
                    </div>
                    {/* Compact Location Label */}
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <div className="text-slate-800 px-2 py-0.5 rounded shadow-lg border" style={{
                        backgroundColor: rideType === 'pickup' ? '#B91C1C' : '#1D4ED8',
                        borderColor: rideType === 'pickup' ? '#991B1B' : '#1E40AF'
                      }}>
                        <p className="text-white text-xs font-semibold" style={{ fontSize: '10px' }}>
                          {rideType === 'pickup' ? 'School' : 'Home'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Multiple School Destination Markers (Driver Mode with Multiple Schools) */}
              {isDriverMode && schoolDestinations.map((school, index) => {
                const schoolPos = schoolPositions[school] || schoolPositions['Wairoa Primary School'];
                const studentCount = studentsBySchool[school]?.length || 0;
                
                return (
                  <div key={school} className="absolute pointer-events-none" style={{ left: schoolPos.x, top: schoolPos.y }}>
                    <div className="relative">
                      {/* School Destination Marker - Red School Icon */}
                      <div 
                        className="w-9 h-9 rounded-full flex items-center justify-center border-3 border-white shadow-lg relative z-10"
                        style={{ backgroundColor: '#DC2626' }}
                      >
                        <School className="w-5 h-5 text-white" strokeWidth={2.5} />
                      </div>
                      {/* Student Count Badge */}
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center border-2 border-red-600">
                        <span className="text-red-600 text-xs font-bold">{studentCount}</span>
                      </div>
                      {/* School Name Label */}
                      <div className="absolute top-11 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <div className="bg-red-50/95 backdrop-blur-sm text-slate-800 px-2 py-1 rounded-lg shadow-lg border border-red-200">
                          <p className="font-bold text-xs" style={{ color: '#DC2626', fontSize: '9px' }}>
                            {school}
                          </p>
                          <p className="text-xs text-slate-600" style={{ fontSize: '8px' }}>
                            School
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Route Line (dotted path from pickup to destination) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#3B82F6" />
                  </marker>
                </defs>
                <path
                  d={`M ${startPosition.x} ${startPosition.y} Q ${parseFloat(startPosition.x) + (parseFloat(endPosition.x) - parseFloat(startPosition.x)) / 2}% ${parseFloat(startPosition.y) + (parseFloat(endPosition.y) - parseFloat(startPosition.y)) / 2}%, ${endPosition.x} ${endPosition.y}`}
                  stroke="#3B82F6"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8,8"
                  markerEnd="url(#arrowhead)"
                  opacity="0.6"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* UI Overlays - Cleaner positioning */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {/* Top Left - Back Button */}
          <div className="absolute top-3 left-3 pointer-events-auto">
            <button
              onClick={() => {
                if (onBack) {
                  // Use onBack if provided (for admin/driver modes)
                  onBack();
                } else if (isDriverMode && onNavigateToStudents) {
                  onNavigateToStudents();
                } else if (onNavigate) {
                  onNavigate('home');
                }
              }}
              className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2.5} />
            </button>
          </div>

          {/* Top Right - LIVE Badge */}
          <div className="absolute top-3 right-3 pointer-events-auto">
            <div className="bg-red-500 text-white px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="font-bold text-sm">LIVE</span>
            </div>
          </div>

          {/* Top Center - Next Stop Card (more compact) */}
          {showNextStop && (
            <div className="absolute top-16 left-3 right-3 pointer-events-auto">
              <div className="bg-white rounded-xl shadow-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-500 text-xs font-medium">NEXT STOP</p>
                    <p className="text-gray-900 font-semibold text-sm truncate">{currentStudentName}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-blue-600 font-bold text-xl">{etaMinutes} min</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowNextStop(false)}
                  className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          )}

          {/* Right Side Controls - Slightly smaller */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col gap-2.5 pointer-events-auto">
            {/* Recenter Button */}
            <button
              onClick={handleRecenter}
              className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              <Navigation className="w-5 h-5 text-white" />
            </button>
            
            {/* Zoom In */}
            <button
              onClick={handleZoomIn}
              className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              <Plus className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
            </button>
            
            {/* Zoom Out */}
            <button
              onClick={handleZoomOut}
              className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              <Minus className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
            </button>
          </div>

          {/* Bottom - Route Progress Card (compact) */}
          {showRouteProgress && (
            <div className={`absolute ${isDriverMode ? 'bottom-3' : 'bottom-20'} left-3 right-3 pointer-events-auto`}>
              <div className="bg-white rounded-xl shadow-xl p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-gray-600 text-xs font-medium">ROUTE PROGRESS</p>
                  <div className="flex items-center gap-2">
                    <p className="text-blue-600 font-bold">{Math.round(progress)}%</p>
                    {/* Only show close button for caregiver mode, not driver mode */}
                    {!isDriverMode && (
                      <button
                        onClick={() => setShowRouteProgress(false)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation - Only show for caregiver panel */}
      {!isDriverMode && (
        <div className="bg-white border-t border-gray-200 shadow-lg z-30">
          <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
            <button
              onClick={() => onNavigate && onNavigate('home')}
              className="flex flex-col items-center gap-1 py-2 px-4 active:scale-95 transition-transform"
            >
              <HomeIcon className="w-6 h-6 text-gray-400" strokeWidth={2} />
              <span className="text-xs text-gray-500 font-medium">Home</span>
            </button>
            
            <button
              onClick={() => onNavigate && onNavigate('book')}
              className="flex flex-col items-center gap-1 py-2 px-4 active:scale-95 transition-transform"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-xs text-gray-500 font-medium">Rides</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 py-2 px-4">
              <Navigation className="w-6 h-6 text-blue-600" strokeWidth={2} fill="currentColor" />
              <span className="text-xs text-blue-600 font-bold">Track</span>
            </button>
            
            <button
              onClick={() => onNavigate && onNavigate('history-feedback')}
              className="flex flex-col items-center gap-1 py-2 px-4 active:scale-95 transition-transform"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-xs text-gray-500 font-medium">History</span>
            </button>
            
            <button
              onClick={() => onNavigate && onNavigate('profile')}
              className="flex flex-col items-center gap-1 py-2 px-4 active:scale-95 transition-transform"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-xs text-gray-500 font-medium">Profile</span>
            </button>
          </div>
          
          <div className="h-1 bg-gray-300 mx-auto" style={{ width: '134px', borderRadius: '100px' }} />
          <div className="h-2" />
        </div>
      )}
    </div>
  );
}