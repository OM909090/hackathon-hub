import { DashboardLayout } from "@/components/DashboardSidebar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageLoader, SkeletonBox, SkeletonLine } from "@/components/PageLoader";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 13 }, (_, i) => i + 8);

type CalendarEvent = {
  title: string;
  day: number;
  startHour: number;
  duration: number;
  color: string;
};

const events: CalendarEvent[] = [
  { title: "Registration Opens", day: 0, startHour: 9, duration: 2, color: "bg-info/20 text-info border-info/30" },
  { title: "Team Formation Deadline", day: 1, startHour: 10, duration: 1, color: "bg-warning/20 text-warning border-warning/30" },
  { title: "Webinar: Problem Statements", day: 1, startHour: 14, duration: 2, color: "bg-accent/20 text-accent border-accent/30" },
  { title: "Project Submission Start", day: 2, startHour: 9, duration: 8, color: "bg-success/20 text-success border-success/30" },
  { title: "Mentor Office Hours", day: 2, startHour: 11, duration: 2, color: "bg-info/20 text-info border-info/30" },
  { title: "Stage 1 Review", day: 3, startHour: 10, duration: 4, color: "bg-accent/20 text-accent border-accent/30" },
  { title: "Workshop: Demo Prep", day: 3, startHour: 15, duration: 2, color: "bg-warning/20 text-warning border-warning/30" },
  { title: "Submission Deadline", day: 4, startHour: 9, duration: 1, color: "bg-destructive/20 text-destructive border-destructive/30" },
  { title: "Stage 2 Evaluation", day: 4, startHour: 11, duration: 4, color: "bg-accent/20 text-accent border-accent/30" },
  { title: "Results Announcement", day: 5, startHour: 14, duration: 2, color: "bg-success/20 text-success border-success/30" },
];

const allDayEvents = [
  { title: "Registration Week", day: 0, span: 3, color: "bg-info/15 text-info" },
  { title: "Submission Window", day: 2, span: 3, color: "bg-success/15 text-success" },
];

const ScheduleSkeleton = () => (
  <div className="max-w-6xl mx-auto">
    <div className="flex items-center justify-between mb-6">
      <div>
        <SkeletonBox className="h-8 w-32 mb-2" />
        <SkeletonLine width="100px" />
      </div>
      <div className="flex items-center gap-2">
        <SkeletonBox className="h-9 w-9 rounded-md" />
        <SkeletonBox className="h-9 w-16 rounded-md" />
        <SkeletonBox className="h-9 w-9 rounded-md" />
      </div>
    </div>
    <div className="card-elevated rounded-xl overflow-hidden">
      <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border">
        <div className="p-3" />
        {days.map((d) => (
          <div key={d} className="p-3 text-center border-l border-border">
            <SkeletonBox className="h-3 w-8 mx-auto mb-1" />
            <SkeletonBox className="h-5 w-5 mx-auto rounded-full" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[60px_repeat(7,1fr)]">
        <div>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-16 border-b border-border flex items-start justify-center pt-1">
              <SkeletonBox className="h-3 w-10" />
            </div>
          ))}
        </div>
        {days.map((_, di) => (
          <div key={di} className="border-l border-border">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-16 border-b border-border" />
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Schedule = () => {
  const [weekOffset, setWeekOffset] = useState(0);

  return (
    <DashboardLayout>
      <PageLoader skeleton={<ScheduleSkeleton />}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Schedule</h1>
                <p className="text-muted-foreground text-sm mt-1">March 2024</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setWeekOffset(weekOffset - 1)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setWeekOffset(0)}>Today</Button>
                <Button variant="outline" size="icon" onClick={() => setWeekOffset(weekOffset + 1)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="card-elevated rounded-xl overflow-hidden">
              <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border">
                <div className="p-3" />
                {days.map((day, i) => (
                  <div key={day} className="p-3 text-center border-l border-border">
                    <div className="text-xs text-muted-foreground">{day}</div>
                    <div className={`text-sm font-semibold mt-0.5 tab-nums ${i === 2 ? "w-7 h-7 rounded-full accent-gradient text-accent-foreground flex items-center justify-center mx-auto" : ""}`}>
                      {10 + i + weekOffset * 7}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border">
                <div className="p-2 text-[10px] text-muted-foreground flex items-center justify-center">All day</div>
                <div className="col-span-7 relative p-1 min-h-[36px]">
                  {allDayEvents.map((ev) => (
                    <div
                      key={ev.title}
                      className={`absolute top-1 h-7 rounded-md px-2 flex items-center text-xs font-medium ${ev.color}`}
                      style={{
                        left: `${(ev.day / 7) * 100}%`,
                        width: `${(ev.span / 7) * 100}%`,
                      }}
                    >
                      {ev.title}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-[60px_repeat(7,1fr)] relative max-h-[600px] overflow-y-auto">
                <div>
                  {hours.map((hour) => (
                    <div key={hour} className="h-16 border-b border-border flex items-start justify-center pt-1">
                      <span className="text-[10px] text-muted-foreground mono">{hour.toString().padStart(2, "0")}:00</span>
                    </div>
                  ))}
                </div>

                {days.map((_, dayIndex) => (
                  <div key={dayIndex} className="relative border-l border-border">
                    {hours.map((hour) => (
                      <div key={hour} className="h-16 border-b border-border" />
                    ))}

                    {events
                      .filter((ev) => ev.day === dayIndex)
                      .map((ev) => (
                        <div
                          key={ev.title}
                          className={`absolute left-1 right-1 rounded-md border px-2 py-1 cursor-pointer transition-all hover:shadow-md ${ev.color}`}
                          style={{
                            top: `${(ev.startHour - 8) * 64}px`,
                            height: `${ev.duration * 64 - 4}px`,
                          }}
                        >
                          <div className="text-xs font-medium truncate">{ev.title}</div>
                          <div className="text-[10px] opacity-70 mono">
                            {ev.startHour.toString().padStart(2, "0")}:00–{(ev.startHour + ev.duration).toString().padStart(2, "0")}:00
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </PageLoader>
    </DashboardLayout>
  );
};

export default Schedule;
