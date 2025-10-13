
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award } from 'lucide-react';
import LessonCard from '@/components/lessons/lesson-card';
import { Camera, CheckCircle, XCircle, ArrowRight, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { GestureRecognizer, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// Mock Data
const userProgress = {
  overallProgress: 45,
  badgeCount: 5,
  xpToNextBadge: 70,
};

const currentLesson = {
  id: 'L3',
  title: 'Essential Questions',
  thumbnail: 'https://picsum.photos/seed/lesson3/300/180',
  description: "Learn to ask 'who,' 'what,' 'where,' 'when,' and 'why.'",
  isUnlocked: true,
};

const allLessons = [
  { id: 'L1', title: 'Alphabet (A-E)', thumbnail: 'https://picsum.photos/seed/lesson1/300/180', category: 'Beginner', progress: 100, xpReward: 50, isUnlocked: true },
  { id: 'L2', title: 'Basic Greetings', thumbnail: 'https://picsum.photos/seed/lesson2/300/180', category: 'Beginner', progress: 100, xpReward: 50, isUnlocked: true },
  { id: 'L3', title: 'Essential Questions', thumbnail: 'https://picsum.photos/seed/lesson3/300/180', category: 'Beginner', progress: 60, xpReward: 75, isUnlocked: true },
  { id: 'L4', title: 'Family Members', thumbnail: 'https://picsum.photos/seed/lesson4/300/180', category: 'Beginner', progress: 0, xpReward: 75, isUnlocked: true },
  { id: 'L5', title: 'Feelings & Emotions', thumbnail: 'https://picsum.photos/seed/lesson5/300/180', category: 'Intermediate', progress: 0, xpReward: 100, isUnlocked: false },
  { id: 'L6', title: 'Restaurant Conversation', thumbnail: 'https://picsum.photos/seed/lesson6/300/180', category: 'Intermediate', progress: 0, xpReward: 120, isUnlocked: false },
  { id: 'L7', title: 'Telling Time', thumbnail: 'https://picsum.photos/seed/lesson7/300/180', category: 'Advanced', progress: 0, xpReward: 150, isUnlocked: false },
  { id: 'L8', title: 'Storytelling Basics', thumbnail: 'https://picsum.photos/seed/lesson8/300/180', category: 'Advanced', progress: 0, xpReward: 200, isUnlocked: false },
];

const recommendedNext = {
  id: 'L4',
  title: 'Family Members',
  thumbnail: 'https://picsum.photos/seed/lesson4/300/180',
};

const signsData = {
  letters: {
    A: { description: "Make the 'A' sign: form a fist with your thumb resting on the side.", image: 'https://picsum.photos/seed/sign-a/300/200', hint: 'sign language A' },
    B: { description: "Make the 'B' sign: hold up your hand with your four fingers extended and your thumb tucked in.", image: 'https://picsum.photos/seed/sign-b/300/200', hint: 'sign language B' },
    C: { description: "Make the 'C' sign: form a 'C' shape with your hand.", image: 'https://picsum.photos/seed/sign-c/300/200', hint: 'sign language C' },
    D: { description: "Make the 'D' sign: point your index finger up and touch your thumb to your other fingers.", image: 'https://picsum.photos/seed/sign-d/300/200', hint: 'sign language D' },
    E: { description: "Make the 'E' sign: bend your four fingers down, with your thumb tucked in.", image: 'https://picsum.photos/seed/sign-e/300/200', hint: 'sign language E' },
    F: { description: "Make the 'F' sign: touch your index finger and thumb together, with other fingers up.", image: 'https://picsum.photos/seed/sign-f/300/200', hint: 'sign language F' },
    G: { description: "Make the 'G' sign: point your index finger sideways, with your thumb on top.", image: 'https://picsum.photos/seed/sign-g/300/200', hint: 'sign language G' },
    H: { description: "Make the 'H' sign: point your index and middle fingers out sideways.", image: 'https://picsum.photos/seed/sign-h/300/200', hint: 'sign language H' },
    I: { description: "Make the 'I' sign: hold up your pinky finger.", image: 'https://picsum.photos/seed/sign-i/300/200', hint: 'sign language I' },
    J: { description: "Make the 'J' sign: hold up your pinky finger and draw a 'J' in the air.", image: 'https://picsum.photos/seed/sign-j/300/200', hint: 'sign language J' },
    K: { description: "Make the 'K' sign: hold up your index and middle fingers, with your thumb between them.", image: 'https://picsum.photos/seed/sign-k/300/200', hint: 'sign language K' },
    L: { description: "Make the 'L' sign: hold up your index finger and thumb in an 'L' shape.", image: 'https://picsum.photos/seed/sign-l/300/200', hint: 'sign language L' },
    M: { description: "Make the 'M' sign: tuck your thumb under your first three fingers.", image: 'https://picsum.photos/seed/sign-m/300/200', hint: 'sign language M' },
    N: { description: "Make the 'N' sign: tuck your thumb under your first two fingers.", image: 'https://picsum.photos/seed/sign-n/300/200', hint: 'sign language N' },
    O: { description: "Make the 'O' sign: form an 'O' shape with your hand.", image: 'https://picsum.photos/seed/sign-o/300/200', hint: 'sign language O' },
    P: { description: "Make the 'P' sign: it's like a 'K' sign, but pointing down.", image: 'https://picsum.photos/seed/sign-p/300/200', hint: 'sign language P' },
    Q: { description: "Make the 'Q' sign: it's like a 'G' sign, but pointing down.", image: 'https://picsum.photos/seed/sign-q/300/200', hint: 'sign language Q' },
    R: { description: "Make the 'R' sign: cross your index and middle fingers.", image: 'https://picsum.photos/seed/sign-r/300/200', hint: 'sign language R' },
    S: { description: "Make the 'S' sign: form a fist with your thumb over your fingers.", image: 'https://picsum.photos/seed/sign-s/300/200', hint: 'sign language S' },
    T: { description: "Make the 'T' sign: tuck your thumb under your index finger.", image: 'https://picsum.photos/seed/sign-t/300/200', hint: 'sign language T' },
    U: { description: "Make the 'U' sign: hold up your index and middle fingers together.", image: 'https://picsum.photos/seed/sign-u/300/200', hint: 'sign language U' },
    V: { description: "Make the 'V' sign: hold up your index and middle fingers apart.", image: 'https://picsum.photos/seed/sign-v/300/200', hint: 'sign language V' },
    W: { description: "Make the 'W' sign: hold up your first three fingers.", image: 'https://picsum.photos/seed/sign-w/300/200', hint: 'sign language W' },
    X: { description: "Make the 'X' sign: crook your index finger.", image: 'https://picsum.photos/seed/sign-x/300/200', hint: 'sign language X' },
    Y: { description: "Make the 'Y' sign: make a fist and extend your thumb and pinky.", image: 'https://picsum.photos/seed/sign-y/300/200', hint: 'sign language Y' },
    Z: { description: "Make the 'Z' sign: hold up your index finger and draw a 'Z' in the air.", image: 'https://picsum.photos/seed/sign-z/300/200', hint: 'sign language Z' },
  },
  numbers: {
    '0': { description: "Make the '0' sign: form an 'O' shape with your hand.", image: 'https://picsum.photos/seed/sign-0/300/200', hint: 'sign language 0' },
    '1': { description: "Make the '1' sign: hold up your index finger.", image: 'https://picsum.photos/seed/sign-1/300/200', hint: 'sign language 1' },
    '2': { description: "Make the '2' sign: hold up your index and middle fingers.", image: 'https://picsum.photos/seed/sign-2/300/200', hint: 'sign language 2' },
    '3': { description: "Make the '3' sign: hold up your thumb, index, and middle fingers.", image: 'https://picsum.photos/seed/sign-3/300/200', hint: 'sign language 3' },
    '4': { description: "Make the '4' sign: hold up four fingers, with your thumb tucked in.", image: 'https://picsum.photos/seed/sign-4/300/200', hint: 'sign language 4' },
    '5': { description: "Make the '5' sign: hold up all five fingers.", image: 'https://picsum.photos/seed/sign-5/300/200', hint: 'sign language 5' },
    '6': { description: "Make the '6' sign: touch your thumb to your pinky, with other fingers up.", image: 'https://picsum.photos/seed/sign-6/300/200', hint: 'sign language 6' },
    '7': { description: "Make the '7' sign: touch your thumb to your ring finger, with other fingers up.", image: 'https://picsum.photos/seed/sign-7/300/200', hint: 'sign language 7' },
    '8': { description: "Make the '8' sign: touch your thumb to your middle finger, with other fingers up.", image: 'https://picsum.photos/seed/sign-8/300/200', hint: 'sign language 8' },
    '9': { description: "Make the '9' sign: touch your thumb to your index finger, with other fingers up.", image: 'https://picsum.photos/seed/sign-9/300/200', hint: 'sign language 9' },
  },
};


export default function LearnPage() {
  const [practiceMode, setPracticeMode] = useState<'letters' | 'numbers'>('letters');
  const [currentSignIndex, setCurrentSignIndex] = useState(0);

  const signs = practiceMode === 'letters' ? Object.keys(signsData.letters) : Object.keys(signsData.numbers);
  const currentSign = signs[currentSignIndex];
  const currentSignData = practiceMode === 'letters' ? signsData.letters[currentSign as keyof typeof signsData.letters] : signsData.numbers[currentSign as keyof typeof signsData.numbers];
  
  const beginnerLessons = allLessons.filter(l => l.category === 'Beginner');
  const intermediateLessons = allLessons.filter(l => l.category === 'Intermediate');
  const advancedLessons = allLessons.filter(l => l.category === 'Advanced');
  const specialLessons = allLessons.filter(l => l.category === 'Special Topics');
  const { toast } = useToast();

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [predictedSign, setPredictedSign] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const gestureRecognizerRef = useRef<GestureRecognizer | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const isPredicting = useRef(false);

  const handleNextSign = useCallback(() => {
    setIsCorrect(null);
    setPredictedSign(null);
    setAccuracy(0);
    setSessionProgress(prev => (prev >= 100 ? 0 : prev + (100 / signs.length)));
    setCurrentSignIndex((prev) => (prev + 1) % signs.length);
  }, [signs.length]);

  useEffect(() => {
    setCurrentSignIndex(0); 
    setSessionProgress(0);
  }, [practiceMode]);

  const predict = useCallback(async () => {
    if (!gestureRecognizerRef.current || !videoRef.current || !canvasRef.current || isPredicting.current) {
      return;
    }

    const video = videoRef.current;
    if (video.readyState < 2) {
      animationFrameId.current = requestAnimationFrame(predict);
      return;
    }

    isPredicting.current = true;
    
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    if (!canvasCtx) {
      isPredicting.current = false;
      return;
    }
    
    const now = performance.now();
    const results = gestureRecognizerRef.current.recognizeForVideo(video, now);
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    const drawingUtils = new DrawingUtils(canvasCtx);
    
    if (results.landmarks) {
      for (const landmarks of results.landmarks) {
        drawingUtils.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, { color: '#FFFFFF', lineWidth: 5 });
        drawingUtils.drawLandmarks(landmarks, { color: '#6C4CF1', lineWidth: 2 });
      }
    }

    if (results.gestures.length > 0) {
      const gesture = results.gestures[0][0];
      let sign = gesture.categoryName.toUpperCase();
      
      const gestureMap: Record<string, string> = {
          'VICTORY': 'V', 'THUMB_UP': 'A', 'THUMB_DOWN': 'T', 'POINTING_UP': 'D',
          'OPEN_PALM': 'B', 'ILOVEYOU': 'Y', 'CLOSED_FIST': 'S',
      };
      if (gestureMap[sign]) sign = gestureMap[sign];
      else if (sign.length > 1) sign = '?';

      setPredictedSign(sign);
      const isMatch = sign === currentSign;
      setIsCorrect(isMatch);
      setAccuracy(Math.round(gesture.score * 100));

    } else {
      setIsCorrect(null);
      setAccuracy(0);
      setPredictedSign(null);
    }
    
    isPredicting.current = false;
    animationFrameId.current = requestAnimationFrame(predict);
  }, [currentSign]);
  
  
  useEffect(() => {
    async function setup() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
        );
        const recognizer = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task`,
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numHands: 1,
        });
        gestureRecognizerRef.current = recognizer;
      } catch (error) {
         console.error("Error creating GestureRecognizer:", error);
         toast({
          variant: "destructive",
          title: "Model Loading Failed",
          description: "Could not load the gesture recognition model. Please try refreshing the page.",
        });
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Camera Not Supported",
          description: "Your browser does not support camera access.",
        });
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener('loadeddata', () => {
             setHasCameraPermission(true);
             if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
             animationFrameId.current = requestAnimationFrame(predict);
          });
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera permissions in your browser settings to use this feature.",
        });
      }
    }
    
    setup();

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, [toast, predict]);


  const cameraStatusText = hasCameraPermission === false ? "Camera access denied." : "Analyzing your sign...";


  return (
    <div className='space-y-6'>
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Practice</CardTitle>
          <div className='flex items-center gap-2'>
            <Button variant={practiceMode === 'letters' ? 'default' : 'outline'} onClick={() => setPracticeMode('letters')}>A-Z</Button>
            <Button variant={practiceMode === 'numbers' ? 'default' : 'outline'} onClick={() => setPracticeMode('numbers')}>0-9</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
    <div className="grid w-full grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 font-sans p-4 gap-6" style={{ gridTemplateColumns: '1.1fr 1.3fr' }}>
      {/* Left Panel */}
      <Card className="flex flex-col gap-4 rounded-2xl p-6 shadow-lg border-none bg-white">
          <h1 className="text-2xl font-bold text-primary">SIGN FOR '{currentSign}'</h1>
          
          <div className="flex justify-center items-center h-[200px] bg-secondary rounded-lg">
            <Image src={currentSignData.image} alt={`Sign for ${currentSign}`} width={300} height={200} className="rounded-lg object-cover" data-ai-hint={currentSignData.hint} />
          </div>

          <p className="text-base text-text-secondary">{currentSignData.description}</p>
          
          <div className='flex-grow' />

          <div>
              <label htmlFor="session-progress" className="text-sm font-medium text-text-primary">Session Progress</label>
              <Progress value={sessionProgress} indicatorClassName="bg-primary" className="h-2.5 mt-1" />
          </div>

          <div className="flex items-center justify-between gap-4">
              <Button variant="outline" className="w-full">Show Hint</Button>
              <Button className="w-full bg-primary text-white" onClick={handleNextSign}>Next Step <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
          
          <p className="text-center font-semibold text-accent-green h-6">
            {isCorrect === true ? "Excellent!" : isCorrect === false ? "Try that one more time." : ""}
          </p>
      </Card>

      {/* Right Panel */}
      <div className="flex flex-col items-center justify-center gap-4">
        <div
          className={cn(
            "relative h-full w-full max-h-[70vh] cursor-pointer overflow-hidden rounded-2xl border-4 object-cover shadow-lg transition-all duration-300 bg-secondary",
            isCorrect === true && "border-success shadow-green-300",
            isCorrect === false && "border-destructive shadow-red-300",
            isCorrect === null && "border-primary"
          )}
        >
          <video ref={videoRef} className="h-full w-full object-cover scale-x-[-1]" autoPlay muted playsInline />
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover scale-x-[-1]" />
          
          { hasCameraPermission === false && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white p-4">
              <Alert variant="destructive">
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                  Please allow camera access in your browser settings to use this feature.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {isCorrect === true && <CheckCircle className="absolute top-4 right-4 h-10 w-10 text-success animate-subtle-bounce" />}
          {isCorrect === false && <XCircle className="absolute top-4 right-4 h-10 w-10 text-destructive animate-subtle-bounce" />}
        </div>
        
        <p className="font-semibold text-primary text-lg">{accuracy}% Accuracy</p>
        <p className="text-sm text-muted-foreground">{cameraStatusText}</p>
      </div>
    </div>
        <footer className="w-full flex items-center justify-around rounded-2xl bg-white p-4 shadow-lg border-t mt-4">
        <div className="flex items-center gap-3">
          <Target className="h-8 w-8 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Accuracy</p>
            <p className="text-xl font-bold text-primary">{accuracy}%</p>
          </div>
        </div>

        <div className="text-center">
            <p className="text-sm text-muted-foreground">Target Sign</p>
            <p className="text-lg font-bold">{currentSign}</p>
        </div>

        <div className="text-center">
            <p className="text-sm text-muted-foreground">You are signing</p>
            <p className="text-lg font-bold text-accent-green">{predictedSign || '...'}</p>
        </div>
        
        <div className="w-48">
            <p className="text-sm text-muted-foreground mb-1">XP Gain</p>
            <Progress value={sessionProgress + (isCorrect ? (100 / signs.length) : 0)} indicatorClassName="bg-accent-green" className="h-2" />
        </div>
        
        <Button className="rounded-full font-bold text-white bg-primary px-8 py-6 text-lg" onClick={handleNextSign}>
          Next <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </footer>
      </CardContent>
    </Card>
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle className="text-2xl font-bold text-primary">Continue Learning</CardTitle>
            <div>
              <p className="text-sm font-medium text-right text-muted-foreground">Overall Progress</p>
              <Progress value={userProgress.overallProgress} className="w-40 h-2 mt-1" indicatorClassName="bg-accent-green" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Card className="overflow-hidden shadow-none border-secondary">
            <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                    <div className="p-6 flex flex-col justify-center">
                        <h3 className="text-xl font-semibold mb-2">{currentLesson.title}</h3>
                        <p className="text-muted-foreground mb-4">{currentLesson.description}</p>
                        <Button className="w-full md:w-auto">Continue Lesson</Button>
                    </div>
                    <div className="hidden md:block">
                        <Image
                            src={currentLesson.thumbnail}
                            alt={currentLesson.title}
                            width={300}
                            height={180}
                            className="w-full h-full object-cover"
                            data-ai-hint="sign language lesson"
                        />
                    </div>
                </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Tabs defaultValue="beginner" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 rounded-xl">
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="special">Special Topics</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
            <TabsContent value="beginner">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {beginnerLessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
                </div>
            </TabsContent>
            <TabsContent value="intermediate">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {intermediateLessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
                </div>
            </TabsContent>
            <TabsContent value="advanced">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {advancedLessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
                </div>
            </TabsContent>
            <TabsContent value="special">
                 <div className="text-center p-8 text-muted-foreground">
                    <p>No special topics yet. Check back soon!</p>
                </div>
            </TabsContent>
        </div>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold">AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Image
                        src={recommendedNext.thumbnail}
                        alt={recommendedNext.title}
                        width={150}
                        height={90}
                        className="rounded-lg object-cover"
                        data-ai-hint="learning sign language"
                    />
                    <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Recommended Next Lesson</p>
                        <p className="font-semibold text-lg">{recommendedNext.title}</p>
                    </div>
                    <Button>Start Now</Button>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold">Milestones & Rewards</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                     <div className="flex items-center gap-3">
                         <Award className="w-6 h-6 text-yellow-500" />
                         <p className="font-medium">Badges Unlocked: {userProgress.badgeCount}</p>
                     </div>
                     <div>
                        <div className="mb-1 flex justify-between">
                            <p className="text-sm font-medium">XP to Next Badge</p>
                            <span className="text-sm font-semibold">{userProgress.xpToNextBadge}%</span>
                        </div>
                        <Progress value={userProgress.xpToNextBadge} indicatorClassName="bg-accent-green" />
                     </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}

    