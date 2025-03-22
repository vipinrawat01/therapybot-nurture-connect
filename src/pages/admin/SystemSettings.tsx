
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bot, 
  Shield, 
  Settings, 
  BarChart3, 
  BrainCircuit, 
  Check,
  RefreshCw,
  AlertCircle,
  Eye,
  ListChecks,
  Lock,
  Users,
  MessagesSquare,
  Search,
  Lightbulb,
  HelpCircle,
  Clipboard
} from "lucide-react";
import Header from "@/components/layout/Header";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Sample AI activity data
const aiActivities = [
  {
    id: "a1",
    activity: "Speech therapy recommendations generated for Noah Williams",
    timestamp: "2 hours ago",
    accuracy: 95,
    feedback: "Very helpful",
    user: "Dr. Emma Thompson (Therapist)"
  },
  {
    id: "a2",
    activity: "Sensory integration activities suggested for Mia Rodriguez",
    timestamp: "Yesterday",
    accuracy: 87,
    feedback: "Partially helpful",
    user: "Janet Miller (Supervisor)"
  },
  {
    id: "a3",
    activity: "Behavior management technique explained to parent",
    timestamp: "2 days ago",
    accuracy: 98,
    feedback: "Excellent suggestions",
    user: "Sarah Chen (Parent)"
  },
  {
    id: "a4",
    activity: "Fine motor skills assessment analyzed",
    timestamp: "3 days ago",
    accuracy: 91,
    feedback: "Good but needed minor adjustments",
    user: "Dr. Marcus Johnson (Therapist)"
  },
  {
    id: "a5",
    activity: "Parent communication strategy suggested",
    timestamp: "1 week ago",
    accuracy: 83,
    feedback: "Needed significant revision",
    user: "Robert Wilson (Supervisor)"
  }
];

// Sample AI models
const aiModels = [
  {
    id: "model1",
    name: "Therapy Assistant GPT",
    version: "3.2",
    specialty: "Speech & Language",
    accuracy: 94,
    active: true
  },
  {
    id: "model2",
    name: "Behavior Analysis GPT",
    version: "2.8",
    specialty: "Behavior Management",
    accuracy: 91,
    active: true
  },
  {
    id: "model3",
    name: "Motor Skills GPT",
    version: "2.5",
    specialty: "Occupational Therapy",
    accuracy: 89,
    active: true
  },
  {
    id: "model4",
    name: "Sensory Integration GPT",
    version: "1.9",
    specialty: "Sensory Processing",
    accuracy: 86,
    active: false
  }
];

export default function AdminSystemSettings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [confidenceThreshold, setConfidenceThreshold] = useState([80]);
  const [aiSettings, setAiSettings] = useState({
    autoApprove: false,
    parentCommunication: true,
    therapistSuggestions: true,
    supervisorReview: true,
    dataCollection: true,
    anonymizedLearning: true,
    contentFiltering: true
  });

  const handleSettingChange = (setting: string) => {
    setAiSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    
    toast.success(`Setting updated successfully`);
  };

  const handleSliderChange = (value: number[]) => {
    setConfidenceThreshold(value);
  };

  const handleModelToggle = (modelId: string) => {
    // In a real app, this would update the model status in the database
    toast.success(`Model status toggled successfully`);
  };

  const handleAIExplanationRequest = (activityId: string) => {
    toast.success("AI explanation request sent. Results will be available shortly.");
  };

  const filteredActivities = aiActivities.filter(activity => 
    activity.activity.toLowerCase().includes(searchQuery.toLowerCase()) || 
    activity.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">System Settings</h1>
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Data</span>
            </Button>
          </div>

          <Tabs defaultValue="ai-monitoring">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="ai-monitoring" className="gap-2">
                <Bot className="h-4 w-4" />
                <span>AI Monitoring</span>
              </TabsTrigger>
              <TabsTrigger value="configuration" className="gap-2">
                <Settings className="h-4 w-4" />
                <span>Configuration</span>
              </TabsTrigger>
              <TabsTrigger value="models" className="gap-2">
                <BrainCircuit className="h-4 w-4" />
                <span>AI Models</span>
              </TabsTrigger>
            </TabsList>

            {/* AI Monitoring Tab */}
            <TabsContent value="ai-monitoring">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-primary" />
                      AI Activity Monitoring
                    </CardTitle>
                    <CardDescription>
                      Track and review AI-generated recommendations and suggestions across the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search AI activities or users..."
                          className="pl-9"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {filteredActivities.length > 0 ? (
                        filteredActivities.map((activity) => (
                          <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border rounded-lg p-4 bg-card"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <BrainCircuit className="h-4 w-4 text-primary" />
                                  <p className="font-medium">{activity.activity}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">{activity.user}</p>
                              </div>
                              <Badge 
                                className={
                                  activity.accuracy >= 95 ? "bg-green-500" : 
                                  activity.accuracy >= 85 ? "bg-amber-500" : "bg-red-500"
                                }
                              >
                                {activity.accuracy}% Accuracy
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center mt-3">
                              <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{activity.feedback}</Badge>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-8 gap-1"
                                  onClick={() => handleAIExplanationRequest(activity.id)}
                                >
                                  <HelpCircle className="h-3.5 w-3.5" />
                                  <span>Explain</span>
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
                          <p>No activities found matching your search criteria</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="gap-2">
                      <Clipboard className="h-4 w-4" />
                      <span>Export Report</span>
                    </Button>
                    <Button className="gap-2">
                      <Eye className="h-4 w-4" />
                      <span>View All Activity</span>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      AI Performance Metrics
                    </CardTitle>
                    <CardDescription>
                      Overview of AI recommendation accuracy and user satisfaction rates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-sm font-medium">Recommendation Accuracy</span>
                          <Badge className="bg-green-500">91%</Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "91%" }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Based on therapist feedback</p>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-sm font-medium">User Satisfaction</span>
                          <Badge className="bg-amber-500">87%</Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "87%" }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Based on all user feedback</p>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-sm font-medium">Activity Adoption</span>
                          <Badge className="bg-blue-500">78%</Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">% of approved recommendations used</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Configuration Tab */}
            <TabsContent value="configuration">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      AI Behavior Settings
                    </CardTitle>
                    <CardDescription>
                      Configure how the AI interacts with different user roles
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Auto-approve Recommendations</div>
                        <div className="text-sm text-muted-foreground">Automatically approve AI suggestions with high confidence</div>
                      </div>
                      <Switch 
                        checked={aiSettings.autoApprove} 
                        onCheckedChange={() => handleSettingChange('autoApprove')} 
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Parent Communication</div>
                        <div className="text-sm text-muted-foreground">Allow AI to generate messages to parents</div>
                      </div>
                      <Switch 
                        checked={aiSettings.parentCommunication} 
                        onCheckedChange={() => handleSettingChange('parentCommunication')} 
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Therapist Suggestions</div>
                        <div className="text-sm text-muted-foreground">Enable AI therapy activity suggestions</div>
                      </div>
                      <Switch 
                        checked={aiSettings.therapistSuggestions} 
                        onCheckedChange={() => handleSettingChange('therapistSuggestions')} 
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Supervisor Review</div>
                        <div className="text-sm text-muted-foreground">Require supervisor approval for AI recommendations</div>
                      </div>
                      <Switch 
                        checked={aiSettings.supervisorReview} 
                        onCheckedChange={() => handleSettingChange('supervisorReview')} 
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Privacy & Security
                    </CardTitle>
                    <CardDescription>
                      Configure data handling and privacy settings for AI operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Data Collection</div>
                        <div className="text-sm text-muted-foreground">Collect user interaction data to improve AI</div>
                      </div>
                      <Switch 
                        checked={aiSettings.dataCollection} 
                        onCheckedChange={() => handleSettingChange('dataCollection')} 
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Anonymized Learning</div>
                        <div className="text-sm text-muted-foreground">Use anonymized data for model training</div>
                      </div>
                      <Switch 
                        checked={aiSettings.anonymizedLearning} 
                        onCheckedChange={() => handleSettingChange('anonymizedLearning')} 
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Content Filtering</div>
                        <div className="text-sm text-muted-foreground">Filter inappropriate content in AI responses</div>
                      </div>
                      <Switch 
                        checked={aiSettings.contentFiltering} 
                        onCheckedChange={() => handleSettingChange('contentFiltering')} 
                      />
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <div className="space-y-0.5">
                        <div className="font-medium">Confidence Threshold</div>
                        <div className="text-sm text-muted-foreground">Minimum confidence level for AI recommendations</div>
                      </div>
                      <div className="pt-4">
                        <Slider
                          defaultValue={confidenceThreshold}
                          max={100}
                          step={1}
                          value={confidenceThreshold}
                          onValueChange={handleSliderChange}
                        />
                        <div className="flex justify-between mt-2">
                          <span className="text-sm text-muted-foreground">Min: 50%</span>
                          <span className="text-sm font-medium">{confidenceThreshold}%</span>
                          <span className="text-sm text-muted-foreground">Max: 100%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      User Access Controls
                    </CardTitle>
                    <CardDescription>
                      Configure which user roles have access to different AI features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Feature</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Admin</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Supervisor</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Therapist</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Parent</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">View AI Recommendations</td>
                          <td className="px-4 py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                          <td className="px-4 py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                          <td className="px-4 py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                          <td className="px-4 py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Request New Recommendations</td>
                          <td className="px-4 py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                          <td className="px-4 py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                          <td className="px-4 py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                          <td className="px-4 py-3 text-center"><AlertCircle className="h-4 w-4 mx-auto text-red-500" /></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Approve Recommendations</td>
                          <td className="px-4 py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                          <td className="px-4 py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                          <td className="px-4 py-3 text-center"><AlertCircle className="h-4 w-4 mx-auto text-red-500" /></td>
                          <td className="px-4 py-3 text-center"><AlertCircle className="h-4 w-4 mx-auto text-red-500" /></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Direct AI Conversation</td>
                          <td className="px-4 py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                          <td className="px-4 py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                          <td className="px-4 py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                          <td className="px-4 py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Access AI Monitoring</td>
                          <td className="px-4 py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                          <td className="px-4 py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                          <td className="px-4 py-3 text-center"><AlertCircle className="h-4 w-4 mx-auto text-red-500" /></td>
                          <td className="px-4 py-3 text-center"><AlertCircle className="h-4 w-4 mx-auto text-red-500" /></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Configure AI Settings</td>
                          <td className="px-4 py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                          <td className="px-4 py-3 text-center"><AlertCircle className="h-4 w-4 mx-auto text-red-500" /></td>
                          <td className="px-4 py-3 text-center"><AlertCircle className="h-4 w-4 mx-auto text-red-500" /></td>
                          <td className="px-4 py-3 text-center"><AlertCircle className="h-4 w-4 mx-auto text-red-500" /></td>
                        </tr>
                      </tbody>
                    </table>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gap-2">
                      <ListChecks className="h-4 w-4" />
                      <span>Save Access Controls</span>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* AI Models Tab */}
            <TabsContent value="models">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-primary" />
                    AI Models Management
                  </CardTitle>
                  <CardDescription>
                    Configure and manage AI models used across the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiModels.map(model => (
                      <div key={model.id} className="border rounded-lg p-4 bg-card">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <Lightbulb className="h-5 w-5 text-primary" />
                              <h3 className="font-medium text-lg">{model.name}</h3>
                              <Badge variant="outline">v{model.version}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Specialty: {model.specialty}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <Badge 
                                className={
                                  model.accuracy >= 90 ? "bg-green-500" : 
                                  model.accuracy >= 80 ? "bg-amber-500" : "bg-red-500"
                                }
                              >
                                {model.accuracy}% Accuracy
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">Based on user feedback</p>
                            </div>
                            <Switch 
                              checked={model.active} 
                              onCheckedChange={() => handleModelToggle(model.id)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="h-4 w-4" />
                            <span>View Details</span>
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            <span>Update Model</span>
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <MessagesSquare className="h-4 w-4" />
                            <span>Test Model</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    <span>Check for Updates</span>
                  </Button>
                  <Button className="gap-2">
                    <Lock className="h-4 w-4" />
                    <span>Manage API Access</span>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
