import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-heading font-bold text-[#0A5796] mb-4"
          >
            NYC Housing Department
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-[#6C757D] max-w-2xl mb-10"
          >
            Future Vision Initiative: Interactive Tools for Urban Housing Development
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-36 flex items-center justify-center mb-4 bg-[#0A5796] bg-opacity-10 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[#0A5796]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <h2 className="font-heading font-bold text-xl mb-2">Opportunity Finder</h2>
                  <p className="text-[#6C757D] mb-4">Discover high-potential development sites across NYC with our interactive map and AI analysis tools.</p>
                  <Link href="/opportunity-finder">
                    <Button className="w-full bg-[#0A5796] hover:bg-[#0A5796]/90">Explore Sites</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-36 flex items-center justify-center mb-4 bg-[#28A745] bg-opacity-10 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[#28A745]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                  </div>
                  <h2 className="font-heading font-bold text-xl mb-2">Development Scenarios</h2>
                  <p className="text-[#6C757D] mb-4">Compare different development approaches with detailed metrics on affordability, costs, and community benefits.</p>
                  <Link href="/development-scenarios">
                    <Button className="w-full bg-[#28A745] hover:bg-[#28A745]/90">Compare Options</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-36 flex items-center justify-center mb-4 bg-[#FF6B00] bg-opacity-10 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="font-heading font-bold text-xl mb-2">Neighborhood Impact</h2>
                  <p className="text-[#6C757D] mb-4">Visualize before/after impacts on density, transit, schools, and economic benefits with AI-generated insights.</p>
                  <Link href="/neighborhood-impact">
                    <Button className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90">View Impacts</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-16 max-w-3xl text-center"
          >
            <h3 className="font-heading font-bold text-2xl mb-4">About This Initiative</h3>
            <p className="text-[#6C757D] mb-6">
              The Future Vision Initiative is a suite of digital tools designed to help the NYC Housing Department and community stakeholders visualize, analyze, and optimize housing development opportunities across the five boroughs.
            </p>
            <p className="text-[#6C757D]">
              By combining data-driven insights with interactive visualizations, we aim to accelerate the creation of affordable, sustainable, and community-enhancing housing projects throughout New York City.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
