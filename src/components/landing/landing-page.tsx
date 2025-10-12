import { ArrowRight, Crown, Lightbulb, Gamepad2, PenTool, Bot, BrainCircuit, Hand } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const LandingPage = () => {
  const heroAvatars = [
    PlaceHolderImages.find((img) => img.id === '1'),
    PlaceHolderImages.find((img) => img.id === '2'),
    PlaceHolderImages.find((img) => img.id === '3'),
  ];
  
  const missionImage = "https://picsum.photos/seed/mission/600/400";
  const processImage = "https://picsum.photos/seed/process/600/600";
  const ctaHandsImage = "https://picsum.photos/seed/hands/600/400";
  const videoPreviewImage = "https://picsum.photos/seed/video/600/400";


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
              <Link href="/dashboard">
                  <Button variant="ghost">Sign in</Button>
              </Link>
              <Link href="/dashboard">
              <Button>Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section id="home" className="py-16 text-center md:py-24">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-4xl font-headline font-bold tracking-tight text-textPrimary md:text-6xl">
                The best place to learn and play for all
              </h1>
              <p className="mt-6 text-lg text-textSecondary">
                Discover thousands of fun and interactive learning activities to support learning progress.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/dashboard">
                  <Button size="lg">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
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
              <Image
                src="https://picsum.photos/seed/hero/1200/600"
                alt="Hero image of diverse people learning"
                width={1200}
                height={600}
                className="rounded-lg shadow-lg"
                data-ai-hint="people learning diverse"
              />
            </div>
          </section>

          {/* Feature Video Section */}
          <section id="features" className="py-16 md:py-24">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-headline font-bold text-textPrimary md:text-4xl">
                  Simplify Your Video Translation Today
                </h2>
                <p className="mt-4 text-textSecondary">
                  Instantly translate your videos to sign language with AI. Sanjog bridges accessibility gaps for the deaf and hard-of-hearing community.
                </p>
                <div className="mt-6">
                  <Link href="/dashboard">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <Image
                  src={videoPreviewImage}
                  alt="Video translation preview"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  data-ai-hint="video player interface"
                />
              </div>
            </div>
          </section>
        </div>

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
                    <Gamepad2 className="h-6 w-6 text-onSecondary" />
                  </div>
                  <CardTitle className="mt-4 text-onSecondary">Learn with Games</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-onSecondary">Playful ways to enhance sign language learning.</p>
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
                <Link href="/dashboard">
                    <Button size="lg">Explore Courses</Button>
                </Link>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Mission Section */}
          <section id="about" className="py-16 md:py-24">
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
                <Image
                  src={missionImage}
                  alt="Diverse group of people communicating"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  data-ai-hint="diverse people communication"
                />
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-16 md:py-24">
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
                <Image
                  src={processImage}
                  alt="Diagram showing the AI learning process"
                  width={600}
                  height={600}
                  className="rounded-lg shadow-lg"
                  data-ai-hint="ai process diagram"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Pricing Section */}
        <section id="pricing" className="bg-surface py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-headline font-bold text-textPrimary md:text-4xl">Our Pricing Plans</h2>
              <p className="mx-auto mt-4 max-w-2xl text-textSecondary">
                Choose a plan that fits your learning goals.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Starter</CardTitle>
                  <p className="text-4xl font-bold">Free</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 text-textSecondary">
                    <li className="flex items-center"><Crown className="mr-2 h-4 w-4 text-primary" /> Access to fun quizzes</li>
                    <li className="flex items-center"><Crown className="mr-2 h-4 w-4 text-primary" /> Interactive activities</li>
                    <li className="flex items-center"><Crown className="mr-2 h-4 w-4 text-primary" /> Community events</li>
                  </ul>
                  <Button variant="outline" className="mt-6 w-full border-primary text-primary">Get Started</Button>
                </CardContent>
              </Card>
              <Card className="border-primary ring-2 ring-primary">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Pro</CardTitle>
                  <p className="text-4xl font-bold">₹499 <span className="text-sm font-normal text-textSecondary">/ month</span></p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 text-textSecondary">
                    <li className="flex items-center"><Crown className="mr-2 h-4 w-4 text-primary" /> Everything in Starter</li>
                    <li className="flex items-center"><Crown className="mr-2 h-4 w-4 text-primary" /> Unlimited access</li>
                    <li className="flex items-center"><Crown className="mr-2 h-4 w-4 text-primary" /> Progress insights</li>
                    <li className="flex items-center"><Crown className="mr-2 h-4 w-4 text-primary" /> Priority support</li>
                  </ul>
                  <Button className="mt-6 w-full">Get Started</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Enterprise</CardTitle>
                  <p className="text-4xl font-bold">Custom</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 text-textSecondary">
                    <li className="flex items-center"><Crown className="mr-2 h-4 w-4 text-primary" /> Unlimited organization accounts</li>
                    <li className="flex items-center"><Crown className="mr-2 h-4 w-4 text-primary" /> Dedicated mentor support</li>
                    <li className="flex items-center"><Crown className="mr-2 h-4 w-4 text-primary" /> Training sessions</li>
                  </ul>
                  <Button variant="outline" className="mt-6 w-full border-primary text-primary">Start Now</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#1E1E2F] py-16 md:py-24 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-headline font-bold md:text-4xl">Get involved with us</h2>
                <p className="mt-4 opacity-80">
                  We’re seeking forward-thinking partners to help expand access to sign language learning globally.
                </p>
                <div className="mt-6">
                  <Button>Sign Up</Button>
                </div>
              </div>
              <div>
                <Image
                  src={ctaHandsImage}
                  alt="Hands coming together"
                  width={600}
                  height={400}
                  className="rounded-lg"
                  data-ai-hint="hands together"
                />
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
    </div>
  );
};

export default LandingPage;

    