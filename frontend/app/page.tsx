import Link from "next/link";
import { Shield, Lock, Users, BarChart3, Clock, Eye, Monitor, Calendar, FileText, AlertTriangle, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">SecureAssess</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground mb-8">
              <Zap className="h-4 w-4 text-primary" />
              <span>Trusted by 50+ educational institutions</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl mb-6">
              Secure MCQ-Based{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Campus Recruitment Portal
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl mb-10">
              A comprehensive web-based platform for conducting and managing online MCQ examinations for campus recruitment. 
              Separate Admin and Student panels with advanced anti-cheating measures for fair assessments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
                Register as Student
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-8 py-3 text-base font-medium text-foreground hover:bg-muted transition-colors"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Powerful Panels for Admins & Students
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive features designed for seamless campus recruitment operations
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Calendar}
              title="Placement Drive Management"
              description="Admins can create and manage placement drives, schedule tests, and assign eligible candidates efficiently."
            />
            <FeatureCard
              icon={Users}
              title="Student Management"
              description="Comprehensive student database management with eligibility tracking and candidate assignment capabilities."
            />
            <FeatureCard
              icon={Monitor}
              title="Live Exam Monitoring"
              description="Real-time monitoring of ongoing examinations with instant alerts and activity tracking for administrators."
            />
            <FeatureCard
              icon={FileText}
              title="MCQ Test Engine"
              description="Robust MCQ examination system with secure timers, randomization, and instant result processing."
            />
            <FeatureCard
              icon={BarChart3}
              title="Performance Dashboard"
              description="Students can track their performance through personalized dashboards with detailed analytics."
            />
            <FeatureCard
              icon={Eye}
              title="Result Publishing"
              description="Automated result generation and publishing with comprehensive reports for placement decisions."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <StatCard number="50+" label="Institutions" />
            <StatCard number="10K+" label="Students Registered" />
            <StatCard number="100K+" label="MCQ Tests Conducted" />
            <StatCard number="99.5%" label="Fair Assessment Rate" />
          </div>
        </div>
      </section>

      {/* Anti-Cheating Section */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-6">
              <AlertTriangle className="h-4 w-4" />
              <span>Advanced Security</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Anti-Cheating Measures
            </h2>
            <p className="text-lg text-muted-foreground">
              Ensure fair and transparent assessments with our comprehensive security features
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SecurityFeature
              icon={Monitor}
              title="Fullscreen Enforcement"
              description="Tests run in fullscreen mode to prevent unauthorized access to other applications."
            />
            <SecurityFeature
              icon={Eye}
              title="Tab-Switch Detection"
              description="Instant detection and logging of tab switching attempts during examinations."
            />
            <SecurityFeature
              icon={Clock}
              title="Secure Timers"
              description="Tamper-proof countdown timers that cannot be manipulated by students."
            />
            <SecurityFeature
              icon={Users}
              title="Session Monitoring"
              description="Continuous session tracking with real-time activity logging for audit trails."
            />
            <SecurityFeature
              icon={Shield}
              title="Activity Logging"
              description="Comprehensive logging of all user actions during the examination period."
            />
            <SecurityFeature
              icon={Lock}
              title="Secure Authentication"
              description="Multi-factor authentication and secure session management for all users."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Streamlined workflow for administrators and students
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <StepCard
              step="01"
              title="Admin Creates Drive"
              description="Administrators create placement drives, schedule MCQ tests, and assign eligible students."
            />
            <StepCard
              step="02"
              title="Students Take Test"
              description="Students securely login, attempt assigned tests with anti-cheating measures enabled."
            />
            <StepCard
              step="03"
              title="Results Published"
              description="Instant results generation with detailed analytics for placement decisions."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 sm:p-12 lg:p-16">
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl mb-4">
                Ready to Streamline Your Campus Recruitment?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                Join institutions using our secure MCQ portal for efficient and transparent placement examinations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-lg bg-background px-8 py-3 text-base font-medium text-foreground hover:bg-background/90 transition-colors"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-lg border border-primary-foreground/20 bg-transparent px-8 py-3 text-base font-medium text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold text-foreground">SecureAssess</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Secure placement assessment platform for the modern education ecosystem.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Security</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SecureAssess. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="group rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string, label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-foreground sm:text-5xl mb-2">{number}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
}

function StepCard({ step, title, description }: { step: string, title: string, description: string }) {
  return (
    <div className="relative">
      <div className="mb-4 text-5xl font-bold text-primary/20">{step}</div>
      <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function SecurityFeature({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-lg border border-border bg-card">
      <div className="flex-shrink-0 h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
