
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  Filter, 
  PlusCircle,
  Baby,
  Calendar,
  Star,
  ArrowUpRight,
  Mail,
  MessageSquare,
  Phone
} from "lucide-react";
import Header from "@/components/layout/Header";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for demonstration
const therapists = [
  {
    id: "1",
    name: "Dr. Emma Thompson",
    image: null,
    role: "Speech & OT Therapist",
    email: "emma.thompson@therapyai.com",
    phone: "+1 (555) 234-5678",
    childrenCount: 8,
    sessionsThisWeek: 24,
    rating: 4.8,
    supervisor: "Janet Miller",
    expertise: ["speech", "occupational", "adl"],
    lastActive: "Today at 2:30 PM",
    children: [
      { id: "c1", name: "Alex Johnson", age: 6, therapy: "speech", progress: 75 },
      { id: "c2", name: "Mia Rodriguez", age: 4, therapy: "occupational", progress: 45 },
      { id: "c3", name: "Noah Williams", age: 7, therapy: "speech", progress: 30 },
    ]
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    image: null,
    role: "Behavior Therapist",
    email: "michael.chen@therapyai.com",
    phone: "+1 (555) 987-6543",
    childrenCount: 6,
    sessionsThisWeek: 18,
    rating: 4.9,
    supervisor: "Janet Miller",
    expertise: ["behavior", "special"],
    lastActive: "Yesterday at 5:15 PM",
    children: [
      { id: "c4", name: "Emily Zhang", age: 5, therapy: "behavior", progress: 80 },
      { id: "c5", name: "Liam Parker", age: 7, therapy: "behavior", progress: 65 },
    ]
  },
  {
    id: "3",
    name: "Dr. Sarah Williams",
    image: null,
    role: "Sensory Therapist",
    email: "sarah.williams@therapyai.com",
    phone: "+1 (555) 345-6789",
    childrenCount: 5,
    sessionsThisWeek: 15,
    rating: 4.7,
    supervisor: "Robert Johnson",
    expertise: ["sensory", "occupational"],
    lastActive: "Today at 10:45 AM",
    children: [
      { id: "c6", name: "Sophia Martinez", age: 4, therapy: "sensory", progress: 55 },
      { id: "c7", name: "Ethan Brown", age: 6, therapy: "sensory", progress: 70 },
      { id: "c8", name: "Olivia Davis", age: 5, therapy: "occupational", progress: 60 },
    ]
  },
  {
    id: "4",
    name: "Dr. James Miller",
    image: null,
    role: "ADL Specialist",
    email: "james.miller@therapyai.com",
    phone: "+1 (555) 456-7890",
    childrenCount: 7,
    sessionsThisWeek: 21,
    rating: 4.6,
    supervisor: "Robert Johnson",
    expertise: ["adl", "behavior"],
    lastActive: "Today at 9:20 AM",
    children: [
      { id: "c9", name: "Benjamin Wilson", age: 7, therapy: "adl", progress: 85 },
      { id: "c10", name: "Emma Clark", age: 5, therapy: "adl", progress: 50 },
    ]
  }
];

export default function AdminTherapists() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);
  
  // Filter therapists based on search term
  const filteredTherapists = therapists.filter(
    therapist => 
      therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      therapist.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const selectedTherapistData = selectedTherapist 
    ? therapists.find(t => t.id === selectedTherapist) 
    : null;

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Therapists</h1>
              <p className="text-muted-foreground">Manage and monitor all therapists in the system</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Add Therapist</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Therapists List Section */}
            <div className="lg:w-1/2 space-y-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search therapists..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {filteredTherapists.length === 0 ? (
                  <div className="text-center py-10 border rounded-lg">
                    <Users className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <p className="font-medium">No therapists found</p>
                    <p className="text-sm text-muted-foreground">Try a different search term</p>
                  </div>
                ) : (
                  filteredTherapists.map((therapist, index) => (
                    <motion.div
                      key={therapist.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card 
                        className={`hover:border-primary/50 transition-colors cursor-pointer ${
                          selectedTherapist === therapist.id ? "border-primary" : ""
                        }`}
                        onClick={() => setSelectedTherapist(therapist.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                              {therapist.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{therapist.name}</h3>
                                  <p className="text-sm text-muted-foreground">{therapist.role}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                  <span className="text-sm font-medium">{therapist.rating}</span>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 mt-3">
                                <div className="flex items-center gap-2">
                                  <Baby className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{therapist.childrenCount} children</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{therapist.sessionsThisWeek} sessions</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-3">
                                {therapist.expertise.map(exp => (
                                  <Badge
                                    key={exp}
                                    variant="outline"
                                    className={`
                                      text-xs
                                      ${exp === 'speech' ? "bg-therapy-speech/10 text-therapy-speech border-therapy-speech/20" : ""}
                                      ${exp === 'behavior' ? "bg-therapy-behavior/10 text-therapy-behavior border-therapy-behavior/20" : ""}
                                      ${exp === 'occupational' ? "bg-therapy-occupational/10 text-therapy-occupational border-therapy-occupational/20" : ""}
                                      ${exp === 'adl' ? "bg-therapy-adl/10 text-therapy-adl border-therapy-adl/20" : ""}
                                      ${exp === 'sensory' ? "bg-therapy-sensory/10 text-therapy-sensory border-therapy-sensory/20" : ""}
                                      ${exp === 'special' ? "bg-therapy-special/10 text-therapy-special border-therapy-special/20" : ""}
                                    `}
                                  >
                                    {exp === 'adl' ? 'ADL' : exp}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Therapist Details Section */}
            <div className="lg:w-1/2">
              {selectedTherapistData ? (
                <motion.div
                  key={selectedTherapistData.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                            {selectedTherapistData.name.charAt(0)}
                          </div>
                          <div>
                            <CardTitle>{selectedTherapistData.name}</CardTitle>
                            <CardDescription>{selectedTherapistData.role}</CardDescription>
                          </div>
                        </div>
                        <div className="space-y-1 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            <span className="font-medium">{selectedTherapistData.rating}/5.0</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Last active: {selectedTherapistData.lastActive}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Contact Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedTherapistData.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedTherapistData.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Supervisor: {selectedTherapistData.supervisor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Send Message</span>
                        </div>
                      </div>

                      <Separator />

                      {/* Therapist's Children */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Assigned Children</h3>
                        <Tabs defaultValue="list" className="w-full">
                          <TabsList className="mb-4">
                            <TabsTrigger value="list">List View</TabsTrigger>
                            <TabsTrigger value="progress">Progress View</TabsTrigger>
                          </TabsList>
                          <TabsContent value="list">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Age</TableHead>
                                  <TableHead>Therapy</TableHead>
                                  <TableHead>Progress</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {selectedTherapistData.children.map(child => (
                                  <TableRow key={child.id}>
                                    <TableCell className="font-medium">{child.name}</TableCell>
                                    <TableCell>{child.age} years</TableCell>
                                    <TableCell>
                                      <Badge
                                        className={`
                                          ${child.therapy === 'speech' ? "bg-therapy-speech/10 text-therapy-speech" : ""}
                                          ${child.therapy === 'behavior' ? "bg-therapy-behavior/10 text-therapy-behavior" : ""}
                                          ${child.therapy === 'occupational' ? "bg-therapy-occupational/10 text-therapy-occupational" : ""}
                                          ${child.therapy === 'adl' ? "bg-therapy-adl/10 text-therapy-adl" : ""}
                                          ${child.therapy === 'sensory' ? "bg-therapy-sensory/10 text-therapy-sensory" : ""}
                                          ${child.therapy === 'special' ? "bg-therapy-special/10 text-therapy-special" : ""}
                                        `}
                                      >
                                        {child.therapy === 'adl' ? 'ADL' : child.therapy}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <div className="w-full bg-muted rounded-full h-2 max-w-24">
                                          <div 
                                            className={`h-2 rounded-full ${
                                              child.progress > 70 ? "bg-status-success" :
                                              child.progress > 40 ? "bg-status-warning" :
                                              "bg-status-danger"
                                            }`}
                                            style={{ width: `${child.progress}%` }}
                                          ></div>
                                        </div>
                                        <span className="text-xs">{child.progress}%</span>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TabsContent>
                          <TabsContent value="progress">
                            <div className="space-y-4">
                              {selectedTherapistData.children.map(child => (
                                <div key={child.id} className="border rounded-lg p-4">
                                  <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-medium">{child.name}</h4>
                                    <Badge
                                      className={`
                                        ${child.therapy === 'speech' ? "bg-therapy-speech/10 text-therapy-speech" : ""}
                                        ${child.therapy === 'behavior' ? "bg-therapy-behavior/10 text-therapy-behavior" : ""}
                                        ${child.therapy === 'occupational' ? "bg-therapy-occupational/10 text-therapy-occupational" : ""}
                                        ${child.therapy === 'adl' ? "bg-therapy-adl/10 text-therapy-adl" : ""}
                                        ${child.therapy === 'sensory' ? "bg-therapy-sensory/10 text-therapy-sensory" : ""}
                                        ${child.therapy === 'special' ? "bg-therapy-special/10 text-therapy-special" : ""}
                                      `}
                                    >
                                      {child.therapy === 'adl' ? 'ADL' : child.therapy}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">Age: {child.age} years</p>
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                      <span>Progress</span>
                                      <span className={`
                                        ${child.progress > 70 ? "text-status-success" :
                                        child.progress > 40 ? "text-status-warning" :
                                        "text-status-danger"}
                                      `}>
                                        {child.progress}%
                                      </span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2">
                                      <div 
                                        className={`h-2 rounded-full ${
                                          child.progress > 70 ? "bg-status-success" :
                                          child.progress > 40 ? "bg-status-warning" :
                                          "bg-status-danger"
                                        }`}
                                        style={{ width: `${child.progress}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">View Full Profile</Button>
                      <Button variant="outline">
                        <ArrowUpRight className="h-4 w-4 mr-2" />
                        View Sessions
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ) : (
                <Card className="h-full flex items-center justify-center py-16">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium text-lg mb-2">Select a Therapist</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                      Click on a therapist from the list to view their detailed profile and children assignments
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
