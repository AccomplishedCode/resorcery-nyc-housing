import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { sites, scenarios } from "@/lib/data";

// Define the AI assistant's pre-programmed responses
const aiResponses = {
  greetings: [
    "Hello! I'm HPD's AI Assistant. How can I help you with the housing development project today?",
    "Welcome to the NYC Housing Project Portal. I'm here to answer your questions about affordable housing development.",
    "Hi there! I'm your virtual assistant for housing development. What information are you looking for today?"
  ],
  fallback: [
    "I'm not sure I understand. Could you rephrase your question about the housing development project?",
    "I don't have specific information on that. Would you like to know about affordability requirements, zoning, or financing options instead?",
    "I'm still learning about that area. Can I help you with information about development scenarios, community impacts, or policy guidelines instead?"
  ],
  // Knowledge base entries
  knowledgeBase: [
    {
      keywords: ["affordable", "ami", "income", "mih"],
      response: "NYC's Mandatory Inclusionary Housing (MIH) program requires 20-30% of new residential developments in rezoned areas to be permanently affordable. The income bands typically range from 40% to 115% of Area Median Income (AMI), which for a family of four in NYC is currently $120,100."
    },
    {
      keywords: ["zoning", "far", "density", "floor area ratio"],
      response: "Zoning in NYC determines what can be built and where. Floor Area Ratio (FAR) limits building size relative to the lot area. In R6 districts, the typical FAR is 2.0-2.43, while R7 districts allow 3.44-4.0. Affordable housing bonuses can increase the permitted FAR by up to 33%."
    },
    {
      keywords: ["tax", "421a", "abatement", "exemption", "incentive"],
      response: "The Affordable New York Housing Program (which replaced the 421-a tax exemption) provides tax benefits for new residential developments that include affordable housing. Benefits typically last 25-35 years and require specific percentages of affordable units at designated income levels."
    },
    {
      keywords: ["community", "benefit", "agreement", "cba", "public space"],
      response: "Community Benefit Agreements (CBAs) are contracts between developers and community organizations that outline specific amenities or services the developer will provide. These can include public spaces, local hiring requirements, funding for community programs, or dedicated facilities like healthcare centers."
    },
    {
      keywords: ["timeline", "process", "approval", "ulurp"],
      response: "The Uniform Land Use Review Procedure (ULURP) is NYC's standardized land use review process. It typically takes 7-9 months and includes community board review, borough president recommendations, City Planning Commission, and City Council approval. The entire development process from concept to completion often takes 3-5 years."
    },
    {
      keywords: ["financing", "funds", "loan", "subsidy", "hpd", "hdc"],
      response: "HPD and HDC offer various financing programs for affordable housing developers. These include low-interest loans, tax-exempt bonds, and subsidy programs. The Mix & Match program provides funding for mixed-income developments, while ELLA supports extremely low and low-income housing developments."
    },
    {
      keywords: ["sustainability", "green", "energy", "efficient", "environmental"],
      response: "NYC has ambitious sustainability requirements for new developments. The Climate Mobilization Act requires buildings over 25,000 sq ft to reduce emissions 40% by 2030 and 80% by 2050. HPD's green building standards promote energy efficiency, water conservation, and healthy living environments."
    },
    {
      keywords: ["scenario", "option", "comparison", "development scenario"],
      response: "This tool allows you to compare different development scenarios with varying levels of affordability, unit counts, and community benefits. The Maximum Affordable scenario maximizes affordable units at 60% AMI. The Mixed-Income scenario provides a balance of market-rate and affordable units. The Market Rate with Amenities scenario focuses on community facilities with fewer affordable units."
    },
    {
      keywords: ["impact", "neighborhood", "school", "transit", "infrastructure"],
      response: "New housing developments impact neighborhood infrastructure in several ways. Our analysis estimates that a 200-unit development adds approximately 30-50 school-aged children, increases transit usage by 5-8%, and generates $1.2-1.8M in annual tax revenue. Mitigation measures may include school capacity expansions, transit improvements, or impact fees."
    },
    {
      keywords: ["policy", "mih", "inclusionary", "mandatory", "upzoning"],
      response: "NYC's housing policies aim to increase affordability while promoting growth. Mandatory Inclusionary Housing requires permanent affordable units in rezoned areas. Upzoning initiatives like SoHo/NoHo and Gowanus rezoning increase density to generate more housing. The Where We Live NYC plan addresses fair housing and segregation through targeted investments and policy changes."
    }
  ],
  // Responses about specific sites
  sites: [
    {
      id: 1,
      response: "Site #1 is zoned R7A with a permitted FAR of 4.0. It's well-located near transit with potential for approximately 120-150 units of housing. The site qualifies for both MIH Option 1 (25% at 60% AMI) and Option 2 (30% at 80% AMI)."
    },
    {
      id: 2,
      response: "Site #2 is zoned R6 with a permitted FAR of 2.43. Located in a growing neighborhood with good school access, it could accommodate 80-100 units. The site is eligible for the FRESH food store incentive, which would provide additional FAR for including a grocery store."
    },
    {
      id: 3,
      response: "Site #3 is zoned M1-4/R7A with a permitted FAR of 4.6 for mixed-use development. It's in a former industrial area transitioning to residential and could support 180-210 units. The site requires environmental remediation, potentially qualifying for brownfield cleanup incentives."
    }
  ],
  // Responses about specific scenarios
  scenarios: [
    {
      id: 1,
      response: "The Maximum Affordable scenario features 80% affordable units at an average of 60% AMI. Unit mix includes 60% family-sized units (2-3 bedrooms). The development would cost approximately $85M with a 10-year tax exemption and utilize HPD's ELLA financing program."
    },
    {
      id: 2,
      response: "The Mixed-Income scenario includes 40% affordable units at an average of 80% AMI and 60% market-rate units. This balanced approach generates cross-subsidy from market-rate units while still providing significant affordable housing. Construction cost is estimated at $95M with improved amenities and finishes."
    },
    {
      id: 3,
      response: "The Market Rate with Amenities scenario provides 25% affordable units (the minimum required under MIH) with extensive community facilities, including a healthcare center, food market, and public plaza. The higher market-rate percentage allows for more comprehensive amenities and a larger community facility component."
    }
  ],
  // Suggested questions for users
  suggestedQuestions: [
    "What are the affordability requirements for new developments?",
    "How does the ULURP approval process work?",
    "What financing options are available for affordable housing?",
    "How will this development impact local schools and transit?",
    "What sustainability requirements apply to new housing?",
    "Can you explain the different development scenarios?",
    "What community benefits are included in this project?",
    "How long will the development process take?",
    "What tax incentives are available for affordable housing?",
    "How does zoning affect what can be built on this site?"
  ]
};

// Message type definition
type Message = {
  id: number;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
};

export default function AIAssistantChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: aiResponses.greetings[0],
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSite, setSelectedSite] = useState<number>(1);
  const [selectedScenario, setSelectedScenario] = useState<number>(1);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  // Get selected site and scenario data
  const activeSite = sites.find(site => site.id === selectedSite);
  const activeScenario = scenarios.find(scenario => scenario.id === selectedScenario);
  
  // Handle sending a message
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (inputValue.trim() === "") return;
    
    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Simulate AI thinking and responding
    setTimeout(() => {
      // Generate AI response
      const aiResponse = generateResponse(inputValue);
      
      const newAiMessage: Message = {
        id: messages.length + 2,
        sender: "ai",
        text: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };
  
  // Generate response based on user input
  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Check if question is about selected site
    if (input.includes("this site") || input.includes("site #") || input.includes("current site")) {
      const siteResponse = aiResponses.sites.find(site => site.id === selectedSite);
      if (siteResponse) return siteResponse.response;
    }
    
    // Check if question is about selected scenario
    if (input.includes("this scenario") || input.includes("current scenario") || input.includes("development scenario")) {
      const scenarioResponse = aiResponses.scenarios.find(scenario => scenario.id === selectedScenario);
      if (scenarioResponse) return scenarioResponse.response;
    }
    
    // Check knowledge base for relevant response
    for (const entry of aiResponses.knowledgeBase) {
      // Check if any keywords match
      if (entry.keywords.some(keyword => input.includes(keyword))) {
        return entry.response;
      }
    }
    
    // If no matches, return fallback response
    return aiResponses.fallback[Math.floor(Math.random() * aiResponses.fallback.length)];
  };
  
  // Handle clicking a suggested question
  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    // Small delay to show the question being "typed"
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };
  
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <div className="bg-[#0A5796] text-white p-4 rounded-t-lg flex items-center">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-heading font-bold text-lg">HPD AI Assistant</h2>
                  <div className="text-xs opacity-75">Online • NYC Housing Department</div>
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user" 
                            ? "bg-[#0A5796] text-white" 
                            : "bg-white border border-gray-200"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <div 
                          className={`text-xs mt-1 ${
                            message.sender === "user" ? "text-white/70" : "text-gray-500"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Type your question about housing development..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-[#0A5796] hover:bg-[#0A5796]/90">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </Button>
                </form>
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-heading font-bold text-lg mb-4">Suggested Questions</h3>
                <div className="space-y-2">
                  {aiResponses.suggestedQuestions.slice(0, 5).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="w-full text-left p-2 text-sm rounded-md hover:bg-[#F8F9FA] transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-heading font-bold text-lg mb-4">Project Context</h3>
                
                <Tabs defaultValue="site">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="site">Site</TabsTrigger>
                    <TabsTrigger value="scenario">Scenario</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="site">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Selected Site:</label>
                        <select 
                          value={selectedSite}
                          onChange={(e) => setSelectedSite(Number(e.target.value))}
                          className="text-sm border rounded px-2"
                        >
                          {sites.map(site => (
                            <option key={site.id} value={site.id}>Site #{site.id}</option>
                          ))}
                        </select>
                      </div>
                      
                      {activeSite && (
                        <div className="bg-[#F8F9FA] p-3 rounded-md">
                          <h4 className="font-medium text-sm mb-1">{activeSite.name}</h4>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-[#6C757D]">Zoning: </span>
                              <span className="font-medium">{activeSite.zoning}</span>
                            </div>
                            <div>
                              <span className="text-[#6C757D]">Allowed FAR: </span>
                              <span className="font-medium">{activeSite.allowedFAR}</span>
                            </div>
                            <div>
                              <span className="text-[#6C757D]">Current FAR: </span>
                              <span className="font-medium">{activeSite.currentFAR}</span>
                            </div>
                            <div>
                              <span className="text-[#6C757D]">Potential Units: </span>
                              <span className="font-medium">{activeSite.potentialUnits}</span>
                            </div>
                          </div>
                          
                          <div className="mt-2 bg-white p-2 rounded border border-gray-200 text-xs">
                            <div className="text-[#0A5796] font-medium mb-1">Ask about this site:</div>
                            <div className="text-[#6C757D]">
                              "What can you tell me about this site?"
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="scenario">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Selected Scenario:</label>
                        <select 
                          value={selectedScenario}
                          onChange={(e) => setSelectedScenario(Number(e.target.value))}
                          className="text-sm border rounded px-2"
                        >
                          {scenarios.slice(0, 3).map(scenario => (
                            <option key={scenario.id} value={scenario.id}>{scenario.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      {activeScenario && (
                        <div className="bg-[#F8F9FA] p-3 rounded-md">
                          <h4 className="font-medium text-sm mb-1">{activeScenario.name}</h4>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-[#6C757D]">Units: </span>
                              <span className="font-medium">{activeScenario.unitCount}</span>
                            </div>
                            <div>
                              <span className="text-[#6C757D]">Affordable: </span>
                              <span className="font-medium">{activeScenario.affordablePercentage}%</span>
                            </div>
                            <div>
                              <span className="text-[#6C757D]">FAR: </span>
                              <span className="font-medium">{activeScenario.far}</span>
                            </div>
                            <div>
                              <span className="text-[#6C757D]">Cost: </span>
                              <span className="font-medium">${activeScenario.estimatedCost}M</span>
                            </div>
                          </div>
                          
                          <div className="mt-2 bg-white p-2 rounded border border-gray-200 text-xs">
                            <div className="text-[#0A5796] font-medium mb-1">Ask about this scenario:</div>
                            <div className="text-[#6C757D]">
                              "Can you explain this development scenario?"
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-heading font-bold text-lg mb-4">About This Demo</h3>
                <p className="text-sm text-[#6C757D] mb-3">
                  This is a demonstration of an AI assistant specialized in NYC housing development. The assistant can answer questions about:
                </p>
                <ul className="space-y-1 text-sm text-[#6C757D] list-disc pl-5 mb-3">
                  <li>Affordable housing requirements</li>
                  <li>Zoning and development regulations</li>
                  <li>Tax incentives and financing programs</li>
                  <li>Community benefits and impact analysis</li>
                  <li>Development scenarios and timelines</li>
                </ul>
                <Separator className="my-3" />
                <div className="text-xs text-[#6C757D] italic">
                  Note: This is a simulated AI using pre-programmed responses. In a production environment, this would connect to a large language model with comprehensive housing policy knowledge.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}