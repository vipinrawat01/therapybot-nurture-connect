
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ChevronRight, 
  Star, 
  Calendar, 
  Clock, 
  User, 
  Activity,
  BarChart,
  CheckCircle,
  Send
} from "lucide-react";
import { TherapyType, TherapyTypeChip } from "./ChildCard";
import { cn } from "@/lib/utils";

interface SessionLoggerProps {
  childId: string;
  childName: string;
  onClose: () => void;
}

export default function SessionLogger({ childId, childName, onClose }: SessionLoggerProps) {
  const [selectedType, setSelectedType] = useState<TherapyType | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    therapyType: "",
    ageGroup: "",
    target: "",
    subTarget: "",
    activity: "",
    performance: 0,
    engagement: "",
    challenges: "",
    notes: "",
  });

  const handleTypeSelect = (type: TherapyType) => {
    setSelectedType(type);
    setFormData(prev => ({ ...prev, therapyType: type }));
    setStep(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit this data to your API
    console.log("Session logged:", formData);
    
    // Show success message or redirect
    setStep(4);
    
    // Close after 2 seconds
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const therapyTypes: TherapyType[] = ['speech', 'behavior', 'occupational', 'adl', 'sensory', 'special'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
    >
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-xl border border-border bg-card shadow-glass"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">Log Therapy Session</h2>
            <p className="text-sm text-muted-foreground">for {childName}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Session Progress</h3>
              <span className="text-sm text-muted-foreground">Step {step} of 3</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-base font-medium mb-4">Select Therapy Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {therapyTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTypeSelect(type)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-4 transition-all hover:border-primary/50 hover:shadow-sm",
                        type === selectedType && "border-primary/50 bg-primary/5"
                      )}
                    >
                      <div className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full",
                        type === 'speech' && "bg-therapy-speech/10 text-therapy-speech",
                        type === 'behavior' && "bg-therapy-behavior/10 text-therapy-behavior",
                        type === 'occupational' && "bg-therapy-occupational/10 text-therapy-occupational",
                        type === 'adl' && "bg-therapy-adl/10 text-therapy-adl",
                        type === 'sensory' && "bg-therapy-sensory/10 text-therapy-sensory",
                        type === 'special' && "bg-therapy-special/10 text-therapy-special",
                      )}>
                        {type === 'speech' && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 6v12"></path><path d="M6 12h12"></path>
                          </svg>
                        )}
                        {type === 'behavior' && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m8 2 1.88 1.88"></path><path d="M14.12 3.88 16 2"></path><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"></path><path d="M12 20v-9"></path><path d="M9 11h6"></path>
                          </svg>
                        )}
                        {type === 'occupational' && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        )}
                        {type === 'adl' && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path><path d="M12 3v6"></path>
                          </svg>
                        )}
                        {type === 'sensory' && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 12h1"></path><path d="M12 2v1"></path><path d="M21 12h1"></path><path d="M12 21v1"></path><path d="m4.93 4.93.87.87"></path><path d="m18.2 4.93-.87.87"></path><path d="m19.07 19.07-.87-.87"></path><path d="m5.8 19.07.87-.87"></path><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"></path>
                          </svg>
                        )}
                        {type === 'special' && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path><path d="M8 7h6"></path><path d="M8 11h8"></path><path d="M8 15h6"></path>
                          </svg>
                        )}
                      </div>

                      <div className="flex items-start flex-col text-left">
                        <span className="text-sm font-medium capitalize">
                          {type === 'adl' ? 'ADL' : type} Therapy
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {type === 'speech' && 'Language & articulation'}
                          {type === 'behavior' && 'Behavior modification'}
                          {type === 'occupational' && 'Fine & gross motor skills'}
                          {type === 'adl' && 'Activities of daily living'}
                          {type === 'sensory' && 'Sensory integration'}
                          {type === 'special' && 'Special education'}
                        </span>
                      </div>

                      <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.form
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  nextStep();
                }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <TherapyTypeChip type={selectedType as TherapyType} />
                    <h3 className="text-base font-medium">Session Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="ageGroup">
                        Child's Age Group
                      </label>
                      <select
                        id="ageGroup"
                        name="ageGroup"
                        value={formData.ageGroup}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
                      >
                        <option value="">Select age group</option>
                        <option value="3-5">3-5 Years</option>
                        <option value="5-7">5-7 Years</option>
                        <option value="7+">7+ Years</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="target">
                        Therapy Target
                      </label>
                      <select
                        id="target"
                        name="target"
                        value={formData.target}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
                      >
                        <option value="">Select target</option>
                        {selectedType === 'speech' && (
                          <>
                            <option value="articulation">Improve Articulation</option>
                            <option value="vocabulary">Expand Vocabulary</option>
                            <option value="comprehension">Language Comprehension</option>
                          </>
                        )}
                        {selectedType === 'behavior' && (
                          <>
                            <option value="attention">Attention Span</option>
                            <option value="communication">Social Communication</option>
                            <option value="impulse">Impulse Control</option>
                          </>
                        )}
                        {selectedType === 'occupational' && (
                          <>
                            <option value="fine-motor">Fine Motor Skills</option>
                            <option value="gross-motor">Gross Motor Skills</option>
                            <option value="coordination">Hand-Eye Coordination</option>
                          </>
                        )}
                        {selectedType === 'adl' && (
                          <>
                            <option value="feeding">Self-Feeding</option>
                            <option value="dressing">Dressing Skills</option>
                            <option value="hygiene">Personal Hygiene</option>
                          </>
                        )}
                        {selectedType === 'sensory' && (
                          <>
                            <option value="tactile">Tactile Sensitivity</option>
                            <option value="auditory">Auditory Processing</option>
                            <option value="visual">Visual Processing</option>
                          </>
                        )}
                        {selectedType === 'special' && (
                          <>
                            <option value="reading">Reading Skills</option>
                            <option value="math">Math Concepts</option>
                            <option value="writing">Writing Skills</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="subTarget">
                        Sub-Target
                      </label>
                      <input
                        id="subTarget"
                        name="subTarget"
                        type="text"
                        placeholder="E.g., Pronouncing 'S' Sound"
                        value={formData.subTarget}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="activity">
                        Activity Performed
                      </label>
                      <input
                        id="activity"
                        name="activity"
                        type="text"
                        placeholder="Describe the therapy activity"
                        value={formData.activity}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium" htmlFor="performance">
                        Performance Rating (1-5)
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, performance: rating }))}
                            className={cn(
                              "h-10 w-10 rounded-full flex items-center justify-center transition-all",
                              formData.performance >= rating
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-muted-foreground/10"
                            )}
                          >
                            <Star className="h-5 w-5" fill={formData.performance >= rating ? "currentColor" : "none"} />
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">
                          {formData.performance === 1 && "Needs significant improvement"}
                          {formData.performance === 2 && "Below expectations"}
                          {formData.performance === 3 && "Met expectations"}
                          {formData.performance === 4 && "Above expectations"}
                          {formData.performance === 5 && "Excellent progress"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="engagement">
                        Child Engagement Level
                      </label>
                      <select
                        id="engagement"
                        name="engagement"
                        value={formData.engagement}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
                      >
                        <option value="">Select engagement level</option>
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="challenges">
                        Challenges Faced
                      </label>
                      <input
                        id="challenges"
                        name="challenges"
                        type="text"
                        placeholder="Any difficulties during the session"
                        value={formData.challenges}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronDown className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.form
                key="step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div>
                  <h3 className="text-base font-medium mb-4">Additional Notes & Submit</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="notes">
                        Session Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        placeholder="Additional observations or comments about the session"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={4}
                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 border border-border">
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Activity className="h-4 w-4 text-primary" />
                        Session Summary
                      </h4>
                      
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                          <Calendar className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <span className="text-muted-foreground">Date:</span>
                            <span className="ml-1 font-medium">{new Date().toLocaleDateString()}</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <span className="text-muted-foreground">Time:</span>
                            <span className="ml-1 font-medium">{new Date().toLocaleTimeString()}</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <User className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <span className="text-muted-foreground">Child:</span>
                            <span className="ml-1 font-medium">{childName}</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className={cn(
                            "h-4 w-4 text-muted-foreground shrink-0 mt-0.5 rounded-full",
                            selectedType === 'speech' && "text-therapy-speech",
                            selectedType === 'behavior' && "text-therapy-behavior",
                            selectedType === 'occupational' && "text-therapy-occupational",
                            selectedType === 'adl' && "text-therapy-adl",
                            selectedType === 'sensory' && "text-therapy-sensory",
                            selectedType === 'special' && "text-therapy-special",
                          )}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="m4.9 4.9 14.2 14.2" />
                            </svg>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Therapy:</span>
                            <span className="ml-1 font-medium capitalize">
                              {selectedType === 'adl' ? 'ADL' : selectedType}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <BarChart className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <span className="text-muted-foreground">Performance:</span>
                            <span className="ml-1 font-medium">
                              {formData.performance}/5
                              {formData.performance === 1 && " (Needs improvement)"}
                              {formData.performance === 2 && " (Below expectations)"}
                              {formData.performance === 3 && " (Met expectations)"}
                              {formData.performance === 4 && " (Above expectations)"}
                              {formData.performance === 5 && " (Excellent)"}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronDown className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 flex items-center gap-2 transition-colors"
                  >
                    <span>Submit Session</span>
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </motion.form>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8"
              >
                <div className="rounded-full bg-status-success/10 p-3 mb-4">
                  <CheckCircle className="h-8 w-8 text-status-success" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Session Logged Successfully</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Your therapy session has been recorded. The AI will analyze the data and provide
                  recommendations shortly.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
