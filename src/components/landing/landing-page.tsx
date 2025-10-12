
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, CheckCircle, Crown, Gamepad2, Lightbulb, PenTool, User, Users, Video } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import AuthModal from '@/components/auth/auth-modal';
import { useUser } from '@/firebase';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const LandingPage = () => {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [isAnnual, setIsAnnual] = useState(false);
  
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
    setAuthView(view);
    setIsAuthModalOpen(true);
  };
  
  const pricingPlans = {
    monthly: [
      {
        title: 'Starter',
        for: 'For Casual Learners',
        price: 'Free',
        icon: <User className="h-8 w-8 text-primary" />,
        description: 'Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.',
        features: ['Access to fun quizzes', 'Limited creative activities', 'Community access', '24/7 chatbot support'],
        isPopular: false,
      },
      {
        title: 'Pro',
        for: 'For startups',
        price: '₹499',
        period: '/monthly',
        icon: <Video className="h-8 w-8 text-white" />,
        description: 'Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.',
        features: ['Everything in Starter', 'Unlimited access to all activities', 'Progress tracking dashboard', 'Priority support'],
        isPopular: true,
      },
      {
        title: 'Enterprise',
        for: 'For big companies',
        price: 'Custom',
        icon: <Users className="h-8 w-8 text-primary" />,
        description: 'Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.',
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
        description: 'Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.',
        features: ['Access to fun quizzes', 'Limited creative activities', 'Community access', '24/7 chatbot support'],
        isPopular: false,
      },
      {
        title: 'Pro',
        for: 'For startups',
        price: '₹4990',
        period: '/annually',
        icon: <Video className="h-8 w-8 text-white" />,
        description: 'Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.',
        features: ['Everything in Starter', 'Unlimited access to all activities', 'Progress tracking dashboard', 'Priority support'],
        isPopular: true,
      },
      {
        title: 'Enterprise',
        for: 'For big companies',
        price: 'Custom',
        icon: <Users className="h-8 w-8 text-primary" />,
        description: 'Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.',
        features: ['All Pro features', 'Unlimited sign translation access', 'Dedicated mentor support', 'Onboarding & training'],
        isPopular: false,
      },
    ]
  };

  const plansToShow = isAnnual ? pricingPlans.annually : pricingPlans.monthly;


  return (
    <div className="bg-background text-textPrimary font-body">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              Sanjog
            </Link>
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
              The best place to learn and play for all
            </h1>
            <p className="mt-6 text-lg text-textSecondary">
              Discover thousands of fun and interactive learning activities to support learning progress.
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
              <p className="ml-4 text-sm font-medium text-textSecondary">+10k Learners</p>
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
        <section id="features" className="py-16 md:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-headline font-bold text-textPrimary md:text-4xl">
                Simplify Your Video Translation Today
              </h2>
              <p className="mt-4 text-textSecondary">
                Instantly translate your videos to sign language with AI. Sanjog bridges accessibility gaps for the deaf and hard-of-hearing community.
              </p>
              <div className="mt-6">
                <Button onClick={() => openAuthModal('signup')}>Sign Up</Button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              {videoPreviewImage && 
                <Image
                  src={videoPreviewImage.imageUrl}
                  alt={videoPreviewImage.description}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  data-ai-hint={videoPreviewImage.imageHint}
                />
              }
            </div>
          </div>
        </section>

        {/* Interactive Features Section */}
        <section className="bg-surface py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-headline font-bold text-textPrimary md:text-4xl">
              Our interactive features
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card className="bg-[#E8E4FF] text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <PenTool className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Fun Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-textSecondary">Discover thousands of fun and interactive learning quizzes.</p>
                </CardContent>
              </Card>
              <Card className="bg-[#DAD5FF] text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Creative Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-textSecondary">Learn through creative and engaging challenges.</p>
                </CardContent>
              </Card>
              <Card className="bg-secondary text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <Gamepad2 className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <CardTitle className="mt-4 text-secondary-foreground">Learn with Games</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-secondary-foreground">Playful ways to enhance sign language learning.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="bg-[#EDEBFF] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-headline font-bold text-textPrimary md:text-4xl">
              Join a Thriving Learning Community
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-textSecondary">
              Connect with millions of learners and experts worldwide to learn, share, and grow together.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">2.5M+</p>
                <p className="mt-2 text-textSecondary">Engaged Learners</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">5K+</p>
                <p className="mt-2 text-textSecondary">Courses Available</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">800+</p>
                <p className="mt-2 text-textSecondary">Expert Mentors</p>
              </div>
            </div>
            <div className="mt-12">
                <Button size="lg" onClick={() => openAuthModal('signup')}>Explore Courses</Button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="about" className="py-16 md:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-headline font-bold text-textPrimary md:text-4xl">The Mission</h2>
              <p className="mt-4 text-textSecondary">
                Our real-time sign language translation platform aims to break down communication barriers globally, powered by advanced AI technology.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-8">
                <div>
                  <p className="text-3xl font-bold text-primary">5,000+</p>
                  <p className="mt-1 text-textSecondary">Deaf People Served</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">7M+</p>
                  <p className="mt-1 text-textSecondary">Lives Impacted</p>
                </div>
              </div>
              <div className="mt-8">
                <Button variant="outline" className="border-primary text-primary">More About Us</Button>
              </div>
            </div>
            <div>
            {missionImage && (
                <Image
                  src={missionImage.imageUrl}
                  alt={missionImage.description}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  data-ai-hint={missionImage.imageHint}
                />
            )}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 md:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-headline font-bold text-textPrimary md:text-4xl">The Process</h2>
              <ul className="mt-8 space-y-6">
                <li className="flex items-start">
                  <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-onPrimary">1</div>
                  <p className="text-textSecondary">Large dataset of sign language</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-onPrimary">2</div>
                  <p className="text-textSecondary">AI-powered branding</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-onPrimary">3</div>
                  <p className="text-textSecondary">24/7 chatbot support</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-onPrimary">4</div>
                  <p className="text-textSecondary">Real-time learning</p>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
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
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-[#0F0434] text-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-block bg-white/10 text-sm font-semibold px-4 py-1.5 rounded-full">Pricing</span>
              <h2 className="text-3xl font-headline font-bold mt-4 md:text-4xl">Our pricing plans</h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/80">
                Lorem ipsum dolor sit amet consectetur adipiscing elit dolor posuere vel venenatis eu sit massa volutpat.
              </p>
              <div className="mt-8 flex justify-center items-center gap-4">
                <Label htmlFor="pricing-toggle" className={cn(!isAnnual && "text-primary")}>Monthly</Label>
                <Switch id="pricing-toggle" checked={isAnnual} onCheckedChange={setIsAnnual} />
                <Label htmlFor="pricing-toggle" className={cn(isAnnual && "text-primary")}>Annually</Label>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
              {plansToShow.map((plan, index) => (
                <Card 
                  key={index}
                  className={cn(
                    "rounded-2xl p-8 h-full flex flex-col",
                    plan.isPopular 
                      ? 'bg-primary/90 text-white relative shadow-2xl shadow-primary/30 scale-105'
                      : 'bg-white/5 text-white'
                  )}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 right-8 bg-white text-primary text-sm font-semibold px-4 py-1 rounded-full">Popular</div>
                  )}
                  <div className="flex items-center gap-4 mb-4">
                      <div className={cn("w-16 h-16 rounded-lg flex items-center justify-center", plan.isPopular ? "bg-white/20" : "bg-white/10")}>
                          {plan.icon}
                      </div>
                      <div>
                          <p className="text-sm text-white/80">{plan.for}</p>
                          <p className="text-2xl font-bold">{plan.title}</p>
                      </div>
                  </div>
                  <p className="text-white/70 text-sm mb-6">{plan.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-white/70">{plan.period}</span>}
                  </div>

                  <div className="flex-grow">
                      <p className="font-semibold mb-4">What's included</p>
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", plan.isPopular ? "bg-white/20" : "bg-white/10")}>
                                <Check className="h-4 w-4" />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                  </div>
                  
                  <Button 
                    className={cn(
                      "w-full mt-8 rounded-full py-6 text-lg font-semibold",
                      plan.isPopular ? 'bg-white text-primary hover:bg-gray-100' : 'bg-white/10 hover:bg-white/20'
                    )}
                    onClick={() => openAuthModal('signup')}
                  >
                    Get started
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#1E1E2F] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-headline font-bold md:text-4xl text-white">Get involved with us</h2>
                <p className="mt-4 text-white/80">
                  We’re seeking forward-thinking partners to help expand access to sign language learning globally.
                </p>
                <div className="mt-6">
                  <Button onClick={() => openAuthModal('signup')}>Sign Up</Button>
                </div>
              </div>
              <div>
              {ctaHandsImage && (
                <Image
                  src={ctaHandsImage.imageUrl}
                  alt={ctaHandsImage.description}
                  width={600}
                  height={400}
                  className="rounded-lg"
                  data-ai-hint={ctaHandsImage.imageHint}
                />
              )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-semibold text-textPrimary">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-sm text-textSecondary hover:text-primary">About</Link></li>
                <li><Link href="#" className="text-sm text-textSecondary hover:text-primary">Careers</Link></li>
                <li><Link href="#" className="text-sm text-textSecondary hover:text-primary">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-textPrimary">Support</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-sm text-textSecondary hover:text-primary">Customer Support</Link></li>
                <li><Link href="#" className="text-sm text-textSecondary hover:text-primary">Terms & Conditions</Link></li>
                <li><Link href="#" className="text-sm text-textSecondary hover:text-primary">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-textPrimary">Follow Us</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-sm text-textSecondary hover:text-primary">LinkedIn</Link></li>
                <li><Link href="#" className="text-sm text-textSecondary hover:text-primary">Twitter</Link></li>
                <li><Link href="#" className="text-sm text-textSecondary hover:text-primary">Instagram</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-textSecondary">
            <p>&copy; {new Date().getFullYear()} Sanjog. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authView}
      />
    </div>
  );
};

export default LandingPage;

    