/**
 * API Routes for University Student Exchange Platform
 * 
 * This file defines all REST API endpoints for the application:
 * - Student management (CRUD operations)
 * - University and exchange program data
 * - AI-powered course recommendations
 * - Application tracking system
 * - Student achievements and grade book
 * - Review and feedback system
 */

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { aiService } from "./aiService";
import { seedDatabase } from "./seedData";
import {
  insertStudentSchema,
  insertUniversitySchema,
  insertExchangeProgramSchema,
  insertCourseSchema,
  insertStudentCourseSchema,
  insertAchievementSchema,
  insertApplicationSchema,
  insertReviewSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Seed database endpoint (for development)
  app.post("/api/seed", async (req, res) => {
    try {
      const result = await seedDatabase();
      res.json({ message: "Database seeded successfully", data: result });
    } catch (error) {
      console.error("Seeding error:", error);
      res.status(500).json({ error: "Failed to seed database" });
    }
  });
  // Students API
  app.get("/api/students/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const student = await storage.getStudent(id);
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch student" });
    }
  });

  app.post("/api/students", async (req, res) => {
    try {
      const studentData = insertStudentSchema.parse(req.body);
      const student = await storage.createStudent(studentData);
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({ error: "Invalid student data" });
    }
  });

  app.put("/api/students/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const student = await storage.updateStudent(id, updates);
      res.json(student);
    } catch (error) {
      res.status(400).json({ error: "Failed to update student" });
    }
  });

  // Student courses API
  app.get("/api/students/:id/courses", async (req, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const courses = await storage.getStudentCourses(studentId);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  app.post("/api/students/:id/courses", async (req, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const courseData = insertStudentCourseSchema.parse({
        ...req.body,
        studentId,
      });

      // Generate embedding for the course
      if (courseData.description) {
        try {
          const embedding = await aiService.generateEmbedding(
            `${courseData.courseName} ${courseData.description}`
          );
          courseData.embedding = embedding;
        } catch (error) {
          console.warn("Failed to generate embedding for course:", error);
        }
      }

      const course = await storage.createStudentCourse(courseData);
      res.status(201).json(course);
    } catch (error) {
      res.status(400).json({ error: "Invalid course data" });
    }
  });

  app.delete("/api/student-courses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteStudentCourse(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete course" });
    }
  });

  // Student achievements API
  app.get("/api/students/:id/achievements", async (req, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const achievements = await storage.getStudentAchievements(studentId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch achievements" });
    }
  });

  app.post("/api/students/:id/achievements", async (req, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const achievementData = insertAchievementSchema.parse({
        ...req.body,
        studentId,
      });
      const achievement = await storage.createAchievement(achievementData);
      res.status(201).json(achievement);
    } catch (error) {
      res.status(400).json({ error: "Invalid achievement data" });
    }
  });

  app.delete("/api/achievements/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteAchievement(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete achievement" });
    }
  });

  // Universities API
  app.get("/api/universities", async (req, res) => {
    try {
      const universities = await storage.getUniversities();
      res.json(universities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch universities" });
    }
  });

  app.get("/api/universities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const university = await storage.getUniversity(id);
      if (!university) {
        return res.status(404).json({ error: "University not found" });
      }
      res.json(university);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch university" });
    }
  });

  app.post("/api/universities", async (req, res) => {
    try {
      const universityData = insertUniversitySchema.parse(req.body);
      const university = await storage.createUniversity(universityData);
      res.status(201).json(university);
    } catch (error) {
      res.status(400).json({ error: "Invalid university data" });
    }
  });

  // Exchange programs API
  app.get("/api/exchange-programs", async (req, res) => {
    try {
      const filters = {
        city: req.query.city as string,
        language: req.query.language as string,
        duration: req.query.duration as string,
        universityId: req.query.universityId ? parseInt(req.query.universityId as string) : undefined,
      };
      
      const programs = await storage.getExchangePrograms(filters);
      res.json(programs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exchange programs" });
    }
  });

  app.get("/api/exchange-programs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const program = await storage.getExchangeProgram(id);
      if (!program) {
        return res.status(404).json({ error: "Exchange program not found" });
      }
      res.json(program);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exchange program" });
    }
  });

  app.post("/api/exchange-programs", async (req, res) => {
    try {
      const programData = insertExchangeProgramSchema.parse(req.body);
      const program = await storage.createExchangeProgram(programData);
      res.status(201).json(program);
    } catch (error) {
      res.status(400).json({ error: "Invalid exchange program data" });
    }
  });

  // Courses API
  app.get("/api/exchange-programs/:id/courses", async (req, res) => {
    try {
      const programId = parseInt(req.params.id);
      const courses = await storage.getCoursesByProgram(programId);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  app.post("/api/exchange-programs/:id/courses", async (req, res) => {
    try {
      const programId = parseInt(req.params.id);
      const courseData = insertCourseSchema.parse({
        ...req.body,
        programId,
      });

      // Generate embedding for the course
      if (courseData.description) {
        try {
          const embedding = await aiService.generateEmbedding(
            `${courseData.name} ${courseData.description} ${courseData.syllabus || ''}`
          );
          courseData.embedding = embedding;
        } catch (error) {
          console.warn("Failed to generate embedding for course:", error);
        }
      }

      const course = await storage.createCourse(courseData);
      res.status(201).json(course);
    } catch (error) {
      res.status(400).json({ error: "Invalid course data" });
    }
  });

  // Applications API
  app.get("/api/students/:id/applications", async (req, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const applications = await storage.getStudentApplications(studentId);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  app.post("/api/applications", async (req, res) => {
    try {
      const applicationData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(applicationData);
      res.status(201).json(application);
    } catch (error) {
      res.status(400).json({ error: "Invalid application data" });
    }
  });

  app.put("/api/applications/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status, reviewNotes } = req.body;
      const application = await storage.updateApplicationStatus(id, status, reviewNotes);
      res.json(application);
    } catch (error) {
      res.status(400).json({ error: "Failed to update application status" });
    }
  });

  // Reviews API
  app.get("/api/exchange-programs/:id/reviews", async (req, res) => {
    try {
      const programId = parseInt(req.params.id);
      const reviews = await storage.getProgramReviews(programId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ error: "Invalid review data" });
    }
  });

  // AI Recommendations API
  app.get("/api/students/:id/recommendations", async (req, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const recommendations = await storage.getStudentRecommendations(studentId);
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recommendations" });
    }
  });

  app.post("/api/students/:id/generate-recommendations", async (req, res) => {
    try {
      const studentId = parseInt(req.params.id);
      
      // Get student profile and courses
      const student = await storage.getStudent(studentId);
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      const studentCourses = await storage.getStudentCourses(studentId);
      
      // Get all exchange programs and their courses
      const allPrograms = await storage.getExchangePrograms();
      const recommendations = [];

      for (const program of allPrograms) {
        const programCourses = await storage.getCoursesByProgram(program.id);
        
        for (const course of programCourses) {
          if (!course.embedding || !course.embedding.length) continue;
          
          // Calculate similarity with each student course
          let maxSimilarity = 0;
          for (const studentCourse of studentCourses) {
            if (!studentCourse.embedding || !studentCourse.embedding.length) continue;
            
            const similarity = aiService.cosineSimilarity(
              course.embedding,
              studentCourse.embedding
            );
            maxSimilarity = Math.max(maxSimilarity, similarity);
          }

          // Only recommend courses with good similarity (>0.7)
          if (maxSimilarity > 0.7) {
            try {
              const reasoning = await aiService.generateRecommendationReasoning(
                {
                  specialty: student.specialty,
                  level: student.level,
                  completedCourses: studentCourses.map(c => ({
                    name: c.courseName,
                    description: c.description || undefined,
                    grade: c.grade
                  }))
                },
                {
                  name: course.name,
                  description: course.description || undefined,
                  prerequisites: course.prerequisites || undefined
                },
                maxSimilarity
              );

              const recommendation = await storage.createRecommendation({
                studentId,
                courseId: course.id,
                programId: program.id,
                score: maxSimilarity,
                reasoning
              });

              recommendations.push(recommendation);
            } catch (error) {
              console.warn("Failed to create recommendation:", error);
            }
          }
        }
      }

      res.json({ 
        message: `Generated ${recommendations.length} recommendations`,
        recommendations 
      });
    } catch (error) {
      console.error("Error generating recommendations:", error);
      res.status(500).json({ error: "Failed to generate recommendations" });
    }
  });

  // AI course description enhancement
  app.post("/api/ai/enhance-course", async (req, res) => {
    try {
      const { courseName, basicInfo } = req.body;
      if (!courseName) {
        return res.status(400).json({ error: "Course name is required" });
      }

      const enhancedDescription = await aiService.enhanceCourseDescription(
        courseName,
        basicInfo
      );

      res.json({ enhancedDescription });
    } catch (error) {
      res.status(500).json({ error: "Failed to enhance course description" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
