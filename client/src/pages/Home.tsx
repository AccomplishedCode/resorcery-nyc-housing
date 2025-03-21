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
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-3 lg:col-span-4"
            >
              <h2 className="text-xl font-semibold text-[#0A5796] mb-2">Core Planning Tools</h2>
            </motion.div>
            
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
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="md:col-span-3 lg:col-span-4 mt-8"
            >
              <h2 className="text-xl font-semibold text-[#0A5796] mb-2">Advanced Analysis Tools</h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-36 flex items-center justify-center mb-4 bg-[#198754] bg-opacity-10 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[#198754]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="font-heading font-bold text-xl mb-2">Environmental Impact</h2>
                  <p className="text-[#6C757D] mb-4">Analyze energy usage, carbon footprint, stormwater management, and solar gain for sustainable development.</p>
                  <Link href="/environmental-impact">
                    <Button className="w-full bg-[#198754] hover:bg-[#198754]/90">Simulate Impact</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-36 flex items-center justify-center mb-4 bg-[#6610f2] bg-opacity-10 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[#6610f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="font-heading font-bold text-xl mb-2">Affordability Calculator</h2>
                  <p className="text-[#6C757D] mb-4">Fine-tune affordable housing parameters to optimize AMI levels, unit mix, and financial feasibility.</p>
                  <Link href="/affordability-calculator">
                    <Button className="w-full bg-[#6610f2] hover:bg-[#6610f2]/90">Calculate Options</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-36 flex items-center justify-center mb-4 bg-[#0dcaf0] bg-opacity-10 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[#0dcaf0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 3D object d M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7l9-4 9 4v10l-9 4-9-4V7z" />
                    </svg>
                  </div>
                  <h2 className="font-heading font-bold text-xl mb-2">3D Visualization</h2>
                  <p className="text-[#6C757D] mb-4">Explore 3D models of development scenarios with street-level views and context visualization.</p>
                  <Link href="/3d-visualization">
                    <Button className="w-full bg-[#0dcaf0] hover:bg-[#0dcaf0]/90">View Models</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-36 flex items-center justify-center mb-4 bg-[#fd7e14] bg-opacity-10 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[#fd7e14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h2 className="font-heading font-bold text-xl mb-2">Policy Lab</h2>
                  <p className="text-[#6C757D] mb-4">Test how adjusting policy parameters like FAR bonuses and tax incentives affects housing outcomes.</p>
                  <Link href="/policy-lab">
                    <Button className="w-full bg-[#fd7e14] hover:bg-[#fd7e14]/90">Test Policies</Button>
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
