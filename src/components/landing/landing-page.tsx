

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Award, ArrowRight, BookOpen, Check, CheckCircle, Crown, Gamepad2, GraduationCap, Lightbulb, PenTool, User, Users, Video, Bot, MessageCircle, Share2, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useUser } from '@/firebase';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import AuthModal from '../auth/auth-modal';

const CreativeActivitiesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8V12M12 12V16M12 12H16M12 12H8" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 12C18.5 13.9655 18.0051 15.8239 17.1375 17.391C16.2699 18.9581 15.071 20.157 13.6822 20.8528C12.2934 21.5486 10.7719 21.713 9.29616 21.3259C7.82041 20.9387 6.46747 20.0223 5.42173 18.721C4.37599 17.4197 3.69931 15.8113 3.48679 14.1221C3.27426 12.433 3.53526 10.7455 4.23896 9.24751C4.94265 7.74952 6.05943 6.51263 7.44754 5.68888C8.83566 4.86514 10.4373 4.5 12 4.5" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Logo = () => (
    <Link href="/" className="flex items-center gap-2">
      <svg width="109" height="40" viewBox="0 0 109 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36.846 21.856q-.038 1.634.93 2.45t2.966.817q3.242 0 3.242-1.986 0-.728-.415-1.156-.402-.427-1.257-.616-.615-.138-1.897-.276a37 37 0 0 1-1.634-.213q-1.62-.29-2.6-1.257-.98-.98-.98-2.551 0-1.722 1.369-2.865 1.381-1.155 3.807-1.156 2.601 0 4.147 1.407 1.558 1.395 1.596 3.695h-2.3q-.1-3.092-3.468-3.092-1.382 0-2.149.516-.754.514-.754 1.42 0 1.42 1.596 1.696.603.114 1.76.251 1.156.139 1.633.214 1.797.327 2.853 1.332 1.055.993 1.055 2.601 0 1.81-1.483 2.94-1.47 1.132-4.172 1.131-.98 0-1.847-.163-.854-.15-1.671-.54a4.9 4.9 0 0 1-1.382-.98q-.566-.59-.905-1.52t-.327-2.1zm15.745 5.303q-2.073 0-3.392-1.006-1.32-1.005-1.32-2.915 0-1.533 1.106-2.651 1.106-1.12 2.966-1.307.703-.075 1.608-.151.905-.088 1.42-.126.515-.05 1.068-.125.553-.076.88-.176.34-.101.527-.252v-.402q0-1.344-.98-2.123-.967-.792-2.488-.792-1.583 0-2.563.779-.98.78-1.018 2.237h-2.287q.038-2.238 1.721-3.67t4.197-1.432q1.508 0 2.778.59a4.96 4.96 0 0 1 2.073 1.76q.816 1.181.842 2.752v5.039q0 1.596 1.583 1.596h.314v2.01h-.69q-1.082 0-1.91-.477-.83-.479-1.232-1.458-.705 1.068-2.086 1.684-1.37.616-3.117.616m-2.362-3.996q0 .93.679 1.445.69.515 1.872.515 1.897 0 3.28-1.043 1.395-1.043 1.394-2.538v-1.056a1.4 1.4 0 0 1-.44.214q-.276.075-.804.15a35 35 0 0 1-.942.1q-.402.039-1.332.114-.918.075-1.495.126-2.212.213-2.212 1.973m16.386-9.739a6.1 6.1 0 0 1 2.124-.377q1.092 0 2.123.377 1.03.377 1.898 1.106t1.395 1.947q.527 1.207.527 2.727v7.59h-2.261v-7.175q0-2.262-.993-3.38-.98-1.131-2.69-1.131t-2.701 1.143q-.98 1.131-.98 3.393v7.15h-2.262v-7.59q0-1.52.528-2.727.527-1.218 1.395-1.947a6.3 6.3 0 0 1 1.897-1.106m28.299 6.647q0 1.634-.54 2.991-.529 1.357-1.446 2.25a6.7 6.7 0 0 1-2.11 1.369 6.8 6.8 0 0 1-2.54.477q-1.344 0-2.55-.477a6.7 6.7 0 0 1-2.111-1.37q-.905-.88-1.445-2.236t-.54-3.004q0-1.634.54-2.978t1.445-2.211a6.5 6.5 0 0 1 2.11-1.358 6.9 6.9 0 0 1 2.552-.477q1.344 0 2.538.477 1.194.466 2.111 1.345.918.867 1.445 2.212.54 1.344.54 2.99m-10.933.038q0 2.374 1.232 3.67 1.23 1.294 3.066 1.294 1.834 0 3.066-1.295 1.23-1.294 1.231-3.669 0-2.451-1.219-3.707-1.218-1.27-3.078-1.27t-3.079 1.27q-1.219 1.257-1.219 3.707m18.787 11.159q-2.74 0-4.385-1.157-1.647-1.143-1.734-3.317h2.287q.138 2.388 3.832 2.388.805-.001 1.483-.176a4 4 0 0 0 1.257-.566q.578-.39.904-1.093.327-.69.327-1.634v-1.495a5.5 5.5 0 0 1-1.91 1.508 5.6 5.6 0 0 1-2.438.553q-1.156 0-2.236-.44a6.4 6.4 0 0 1-1.936-1.244q-.855-.804-1.37-2.073-.514-1.282-.514-2.828 0-1.582.527-2.865.54-1.281 1.445-2.098a6.3 6.3 0 0 1 2.049-1.244 6.7 6.7 0 0 1 2.412-.44q2.79 0 4.511 1.81Q109 16.652 109 19.505v6.333q0 1.357-.515 2.413-.516 1.067-1.395 1.709a6.4 6.4 0 0 1-1.985.967 7.9 7.9 0 0 1-2.338.34m-4.008-11.549q0 2.1 1.156 3.293 1.168 1.18 2.752 1.18.792 0 1.508-.263a4.3 4.3 0 0 0 1.307-.804q.603-.54.955-1.433.351-.891.351-2.023 0-2.225-1.143-3.38-1.13-1.155-2.878-1.156-1.76 0-2.89 1.169-1.118 1.168-1.118 3.417" fill="#141414"/><path fillRule="evenodd" clipRule="evenodd" d="M73.652 30.916h.729q2.588 0 3.945-1.395 1.37-1.395 1.37-4.034V13.411h-2.262v12.051q0 1.872-.842 2.651-.829.792-2.55.792h-.39z" fill="#141414"/><path d="M77.02 10.194q0-.64.452-1.093.465-.452 1.093-.452.603 0 1.056.465.465.452.465 1.08 0 .654-.465 1.119a1.45 1.45 0 0 1-1.056.452q-.628 0-1.093-.452a1.55 1.55 0 0 1-.452-1.119" fill="#8400FF"/><path d="M13.573 11.602A13.793 13.793 0 0 1 27.296 24.04 13.789 13.789 0 0 1 3.823 35.142l5.637-5.637a5.818 5.818 0 1 0 4.113-9.93zM11.1.265a13.79 13.79 0 0 1 12.44 3.774l-5.638 5.637a5.817 5.817 0 1 0-4.113 9.93v7.972A13.789 13.789 0 0 1 11.1.265" fill="#141414"/></svg>
    </Link>
);


const LandingPage = () => {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'signup'>('login');
  
  const heroAvatars = [
    PlaceHolderImages.find((img) => img.id === '1'),
    PlaceHolderImages.find((img) => img.id === '2'),
    PlaceHolderImages.find((img) => img.id === '3'),
  ];
  
  const missionImage = PlaceHolderImages.find((img) => img.id === 'mission');
  const processImage = PlaceHolderImages.find((img) => img.id === 'process');
  const ctaHandsImage = PlaceHolderImages.find((img) => img.id === 'cta-hands');
  const videoPreviewImage = PlaceHolderImages.find((img) => img.id === 'video-preview');
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const openAuthModal = (view: 'login' | 'signup') => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };
  
  const pricingPlans = {
    monthly: [
      {
        title: 'Starter',
        for: 'For Casual Learners',
        price: 'Free',
        icon: <User className="h-8 w-8 text-primary" />,
        description: 'Get a taste of sign language with our introductory lessons and quizzes.',
        features: ['Access to fun quizzes', 'Limited creative activities', 'Community access', '24/7 chatbot support'],
        isPopular: false,
      },
      {
        title: 'Pro',
        for: 'For Dedicated Learners',
        price: '₹499',
        period: '/monthly',
        icon: <Video className="h-8 w-8 text-primary" />,
        description: 'Unlock our full potential with unlimited access and progress tracking.',
        features: ['Everything in Starter', 'Unlimited access to all activities', 'Progress tracking dashboard', 'Priority support'],
        isPopular: true,
      },
      {
        title: 'Enterprise',
        for: 'For Organizations',
        price: 'Custom',
        icon: <Users className="h-8 w-8 text-primary" />,
        description: 'Custom solutions for schools, businesses, and large groups.',
        features: ['All Pro features', 'Unlimited sign translation access', 'Dedicated mentor support', 'Onboarding & training'],
        isPopular: false,
      },
    ],
    annually: [
        {
        title: 'Starter',
        for: 'For Casual Learners',
        price: 'Free',
        icon: <User className="h-8 w-8 text-primary" />,
        description: 'Get a taste of sign language with our introductory lessons and quizzes.',
        features: ['Access to fun quizzes', 'Limited creative activities', 'Community access', '24/7 chatbot support'],
        isPopular: false,
      },
      {
        title: 'Pro',
        for: 'For Dedicated Learners',
        price: '₹4990',
        period: '/annually',
        icon: <Video className="h-8 w-8 text-primary" />,
        description: 'Unlock our full potential with unlimited access and progress tracking.',
        features: ['Everything in Starter', 'Unlimited access to all activities', 'Progress tracking dashboard', 'Priority support'],
        isPopular: true,
      },
      {
        title: 'Enterprise',
        for: 'For Organizations',
        price: 'Custom',
        icon: <Users className="h-8 w-8 text-primary" />,
        description: 'Custom solutions for schools, businesses, and large groups.',
        features: ['All Pro features', 'Unlimited sign translation access', 'Dedicated mentor support', 'Onboarding & training'],
        isPopular: false,
      },
    ]
  };

  const plansToShow = isAnnual ? pricingPlans.annually : pricingPlans.monthly;


  return (
    <div className="bg-background text-textPrimary font-body">
       <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authModalView}
      />
      <header className="sticky top-0 z-50 bg-surface border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Logo />
            <nav className="hidden items-center gap-6 md:flex">
              <Link href="#home" className="text-sm font-medium text-textSecondary hover:text-primary">Home</Link>
              <Link href="#features" className="text-sm font-medium text-textSecondary hover:text-primary">Features</Link>
              <Link href="#community" className="text-sm font-medium text-textSecondary hover:text-primary">Community</Link>
              <Link href="#pricing" className="text-sm font-medium text-textSecondary hover:text-primary">Pricing</Link>
              <Link href="#about" className="text-sm font-medium text-textSecondary hover:text-primary">About</Link>
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => openAuthModal('login')}>Log in</Button>
              <Button onClick={() => openAuthModal('signup')}>Sign up</Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="py-16 text-center md:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-headline font-bold tracking-tight text-textPrimary md:text-6xl">
              Learn Sign Language, The Fun and Easy Way
            </h1>
            <p className="mt-6 text-lg text-textSecondary max-w-2xl mx-auto">
              Discover thousands of fun and interactive learning activities to support your sign language journey and track your progress.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" onClick={() => openAuthModal('signup')}>
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center">
              <div className="flex -space-x-2">
                {heroAvatars.map((avatar, index) => avatar && (
                  <Avatar key={index} className="h-10 w-10 border-2 border-white">
                    <AvatarImage src={avatar.imageUrl} alt={`Learner ${index + 1}`} data-ai-hint={avatar.imageHint} />
                    <AvatarFallback>{`L${index + 1}`}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="ml-4 text-sm font-medium text-textSecondary">+10k Learners Joined</p>
            </div>
          </div>
          <div className="mt-12">
            {heroImage && 
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1200}
                height={600}
                className="rounded-lg shadow-lg"
                data-ai-hint={heroImage.imageHint}
              />
            }
          </div>
        </section>

        {/* Feature Video Section */}
        <section id="features" className="bg-surface py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div >
                {videoPreviewImage && (
                  <Image
                    src={videoPreviewImage.imageUrl}
                    alt={videoPreviewImage.description}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                    data-ai-hint={videoPreviewImage.imageHint}
                  />
                )}
              </div>
              <div>
                <h2 className="text-3xl font-headline font-bold md:text-4xl">
                  Simplify Your Video Translation Today
                </h2>
                <p className="mt-4 text-textSecondary max-w-xl">
                  Instantly translate your videos to sign language with AI. Sanjog bridges accessibility gaps for the deaf and hard-of-hearing community, making content accessible to profoundly Deaf people worldwide.
                </p>
                <div className="mt-6">
                  <Button
                    onClick={() => openAuthModal('signup')}
                    className="bg-primary text-primary-foreground"
                  >
                    Try for Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Features Section */}
        <section className="bg-background py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="inline-block bg-secondary text-primary text-sm font-semibold px-4 py-1.5 rounded-full">INTERACTIVE FEATURES</span>
                    <p className="mt-2 text-3xl md:text-4xl font-headline font-bold text-textPrimary max-w-2xl mx-auto">
                        Features That Make Learning Fun
                    </p>
                     <p className="mt-4 text-lg text-textSecondary max-w-2xl mx-auto">
                        Our platform is designed to be engaging and effective, with features that cater to all learning styles.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    <Card className="bg-card p-6 text-center border shadow-sm">
                        <div className="mb-4 inline-block rounded-full bg-secondary p-3">
                            <GraduationCap className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="mt-4 text-xl font-bold">Fun Quizzes</CardTitle>
                        <CardContent className="p-0 mt-2">
                            <p className="text-textSecondary">Test your knowledge with interactive quizzes and challenges.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card p-6 text-center border shadow-sm">
                         <div className="mb-4 inline-block rounded-full bg-secondary p-3">
                           <BrainCircuit className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="mt-4 text-xl font-bold">AI-Powered Feedback</CardTitle>
                        <CardContent className="p-0 mt-2">
                            <p className="text-textSecondary">Get real-time feedback on your signing from our smart AI tutor.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card p-6 text-center border shadow-sm">
                        <div className="mb-4 inline-block rounded-full bg-secondary p-3">
                           <Gamepad2 className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="mt-4 text-xl font-bold">Learn with Games</CardTitle>
                        <CardContent className="p-0 mt-2">
                            <p className="text-textSecondary">Play engaging games that make practicing sign language a joy.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        {/* Community Section */}
        <section id="community" className="bg-surface text-textPrimary py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-secondary text-primary text-sm font-semibold px-4 py-1.5 rounded-full">Community</span>
            <h2 className="text-3xl font-headline font-bold mt-4 md:text-4xl">
              Join a Thriving Learning Community
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-textSecondary">
              Sanjog connects you with millions of learners and expert mentors, providing the guidance and resources needed to excel in your journey.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <Card className="bg-card border text-center py-6">
                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-secondary p-3">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-textPrimary">2.5M+</p>
                <p className="mt-2 text-textSecondary">Engaged Learners</p>
              </Card>
              <Card className="bg-card border text-center py-6">
                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-secondary p-3">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-textPrimary">5K+</p>
                <p className="mt-2 text-textSecondary">Courses Available</p>
              </Card>
              <Card className="bg-card border text-center py-6">
                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-secondary p-3">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-textPrimary">800+</p>
                <p className="mt-2 text-textSecondary">Expert Mentors</p>
              </Card>
            </div>
            <div className="mt-12">
               <Button size="lg" onClick={() => openAuthModal('signup')}>Join The Community</Button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="about" className="py-16 md:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-secondary text-primary text-sm font-semibold px-4 py-1.5 rounded-full uppercase">Our Mission</span>
             <p className="mt-2 text-3xl md:text-4xl font-headline font-bold text-textPrimary max-w-2xl mx-auto">
                Making Communication Accessible for All
            </p>
            <p className="mt-4 text-lg text-textSecondary max-w-3xl mx-auto">
                Our real-time sign language translation platform is designed to break down communication barriers instantly, empowering the Deaf and hard-of-hearing community worldwide.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                  <h3 className="text-2xl font-bold leading-tight mb-4">
                      Bridging Gaps with Technology
                  </h3>
                  <p className="text-textSecondary mb-8 ">
                    At Sanjog, we leverage cutting-edge AI to provide seamless translation, creating a more inclusive world. We believe that everyone deserves to be understood, and our mission is to make that a reality.
                  </p>
                  <Button variant="outline">Learn More About Us</Button>
              </div>
              <div>
                  {missionImage && (
                      <Image
                        src={missionImage.imageUrl}
                        alt={missionImage.description}
                        width={600}
                        height={400}
                        className="rounded-2xl shadow-lg object-cover w-full h-full"
                        data-ai-hint={missionImage.imageHint}
                      />
                  )}
              </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-surface py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <span className="inline-block bg-secondary text-primary text-sm font-semibold px-4 py-1.5 rounded-full uppercase mb-2">Our Process</span>
                 <p className="text-3xl md:text-4xl font-headline font-bold text-textPrimary max-w-md">How Our AI Works Its Magic</p>
                <ul className="space-y-8 mt-8">
                  <li className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <Share2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Large Sign Language Datasets</h3>
                      <p className="text-textSecondary mt-1">We train our AI on vast and diverse datasets of sign language to ensure accuracy.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <BrainCircuit className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">AI-Powered Video Blending</h3>
                       <p className="text-textSecondary mt-1">Our technology intelligently blends signs to create fluid, natural-looking translations.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Real-Time Learning & Feedback</h3>
                       <p className="text-textSecondary mt-1">Practice your signs and get instant feedback from our AI to improve your skills.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div >
              {processImage && (
                <Image
                  src={processImage.imageUrl}
                  alt={processImage.description}
                  width={600}
                  height={600}
                  className="rounded-lg shadow-lg"
                  data-ai-hint={processImage.imageHint}
                />
              )}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="text-textPrimary py-16 md:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-block bg-secondary text-primary text-sm font-semibold px-4 py-1.5 rounded-full">Pricing</span>
              <h2 className="text-3xl font-headline font-bold mt-4 md:text-4xl">Our Pricing Plans</h2>
              <p className="mx-auto mt-4 max-w-2xl text-textSecondary">
                Choose the plan that's right for you and start your sign language journey today.
              </p>
              <div className="mt-8 flex justify-center items-center gap-4">
                <Label htmlFor="pricing-toggle" className={cn(!isAnnual && "text-primary")}>Monthly</Label>
                <Switch id="pricing-toggle" checked={isAnnual} onCheckedChange={setIsAnnual} />
                <Label htmlFor="pricing-toggle" className={cn(isAnnual && "text-primary")}>Annually (Save 20%)</Label>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
              {plansToShow.map((plan, index) => (
                <Card 
                  key={index}
                  className={cn(
                    "rounded-2xl p-8 h-full flex flex-col border",
                    plan.isPopular 
                      ? 'bg-primary text-white relative shadow-2xl shadow-primary/30 scale-105'
                      : 'bg-card text-card-foreground'
                  )}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 right-8 bg-accent text-accent-foreground text-sm font-semibold px-4 py-1 rounded-full">Popular</div>
                  )}
                  <div className="flex items-center gap-4 mb-4">
                      <div className={cn("w-16 h-16 rounded-lg flex items-center justify-center", plan.isPopular ? "bg-white/20" : "bg-secondary")}>
                          {plan.icon}
                      </div>
                      <div>
                          <p className={cn("text-sm", plan.isPopular ? "text-white/80" : "text-muted-foreground")}>{plan.for}</p>
                          <p className="text-2xl font-bold">{plan.title}</p>
                      </div>
                  </div>
                  <p className={cn("text-sm mb-6 flex-grow", plan.isPopular ? "text-white/70" : "text-muted-foreground")}>{plan.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    {plan.period && <span className={cn("text-sm", plan.isPopular ? "text-white/70" : "text-muted-foreground")}>{plan.period}</span>}
                  </div>

                  <div className="flex-grow">
                      <p className="font-semibold mb-4">What's included</p>
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0", plan.isPopular ? "bg-white/20" : "bg-secondary")}>
                                <Check className="h-4 w-4" />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                  </div>
                  
                  <Button 
                    onClick={() => openAuthModal('signup')}
                    className={cn(
                      "w-full mt-8 rounded-full py-6 text-lg font-semibold",
                      plan.isPopular ? 'bg-white text-primary hover:bg-gray-100' : ''
                    )}
                    variant={plan.isPopular ? 'default' : 'outline'}
                  >
                    Get started
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-surface">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 rounded-2xl bg-primary text-primary-foreground p-8 md:p-12">
              <div>
                <h2 className="text-3xl font-headline font-bold">
                  Start Learning Today
                </h2>
                <p className="mt-4 text-primary-foreground/80 max-w-md">
                 Join thousands of others on the journey to master sign language. With our interactive tools and supportive community, you'll be signing with confidence in no time.
                </p>
                <div className="mt-6">
                  <Button 
                      onClick={() => openAuthModal('signup')}
                      variant="secondary"
                      className="rounded-full bg-white text-primary group"
                  >
                      Sign Up For Free
                      <span className="ml-2 h-6 w-6 rounded-full bg-black/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
                          <ArrowRight className="h-4 w-4" />
                      </span>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                {ctaHandsImage && (
                  <Image
                    src={ctaHandsImage.imageUrl}
                    alt={ctaHandsImage.description}
                    width={400}
                    height={400}
                    className="rounded-lg object-cover"
                    data-ai-hint={ctaHandsImage.imageHint}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-12">
            <div className='md:col-span-4'>
                <Logo />
                <p className="mt-4 text-textSecondary max-w-xs">An interactive and fun way to learn sign language, backed by AI and a supportive community.</p>
            </div>
            <div className='md:col-span-2'>
              <h3 className="font-semibold text-textSecondary tracking-wider uppercase text-sm">Company</h3>
              <ul className="mt-4 space-y-3">
                <li><Link href="#about" className="text-base text-textPrimary hover:text-primary">About</Link></li>
                <li><Link href="#features" className="text-base text-textPrimary hover:text-primary">Features</Link></li>
                <li><Link href="#pricing" className="text-base text-textPrimary hover:text-primary">Pricing</Link></li>
                <li><Link href="#" className="text-base text-textPrimary hover:text-primary">Careers</Link></li>
              </ul>
            </div>
            <div className='md:col-span-2'>
              <h3 className="font-semibold text-textSecondary tracking-wider uppercase text-sm">Help</h3>
              <ul className="mt-4 space-y-3">
                <li><Link href="#" className="text-base text-textPrimary hover:text-primary">Customer Support</Link></li>
                <li><Link href="#" className="text-base text-textPrimary hover:text-primary">Terms & Conditions</Link></li>
                <li><Link href="#" className="text-base text-textPrimary hover:text-primary">Privacy Policy</Link></li>
              </ul>
            </div>
            <div className='md:col-span-4'>
                <h3 className="font-semibold text-textSecondary tracking-wider uppercase text-sm">Newsletter</h3>
                <p className="mt-4 text-textSecondary">Stay up to date with the latest news and features from Sanjog.</p>
                <form className="mt-4 flex flex-col sm:flex-row gap-2">
                    <Input type="email" placeholder="Enter your email address" className="flex-1" />
                    <Button type="submit">Subscribe</Button>
                </form>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-textSecondary">
            <p>&copy; {new Date().getFullYear()} Sanjog. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
    