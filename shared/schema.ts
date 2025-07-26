/**
 * Database Schema for University Student Exchange Platform
 * 
 * This file defines all database tables, relations, and Zod schemas
 * for the university exchange application system.
 * 
 * Features:
 * - Complete student management system
 * - University and exchange program data
 * - AI-powered course recommendations with vector embeddings
 * - Application tracking and reviews
 * - Student achievements and grade book
 */

import { pgTable, text, serial, integer, boolean, timestamp, real, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Students table - stores student profile information
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  university: text("university").notNull(),
  faculty: text("faculty").notNull(),
  studentId: text("student_id").notNull(),
  specialtyCode: text("specialty_code").notNull(),
  specialty: text("specialty").notNull(),
  level: text("level").notNull(), // Бакалавриат, Магистратура
  course: integer("course").notNull(),
  studyForm: text("study_form").notNull(), // Очное, Заочное
  financing: text("financing").notNull(), // Бюджет, Контракт
  englishLevel: text("english_level"),
  profileImageUrl: text("profile_image_url"),
  averageGrade: real("average_grade"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Universities table
export const universities = pgTable("universities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull().default("Россия"),
  description: text("description"),
  website: text("website"),
  contactEmail: text("contact_email"),
  logoUrl: text("logo_url"),
  rating: real("rating").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Exchange programs offered by universities
export const exchangePrograms = pgTable("exchange_programs", {
  id: serial("id").primaryKey(),
  universityId: integer("university_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  duration: text("duration"), // семестр, год
  language: text("language").notNull().default("Русский"),
  requirements: jsonb("requirements"), // JSON с требованиями
  availableSpots: integer("available_spots").default(10),
  applicationDeadline: timestamp("application_deadline"),
  semesterStart: timestamp("semester_start"),
  semesterEnd: timestamp("semester_end"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Courses within exchange programs
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  programId: integer("program_id").notNull(),
  name: text("name").notNull(),
  code: text("code"),
  description: text("description"),
  credits: integer("credits").default(3),
  prerequisites: text("prerequisites"),
  syllabus: text("syllabus"),
  instructor: text("instructor"),
  embedding: real("embedding").array(), // Vector embedding for AI recommendations
  createdAt: timestamp("created_at").defaultNow(),
});

// Student completed courses (grade book)
export const studentCourses = pgTable("student_courses", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  courseName: text("course_name").notNull(),
  courseCode: text("course_code"),
  grade: text("grade").notNull(),
  credits: integer("credits").default(3),
  semester: text("semester"),
  year: integer("year"),
  description: text("description"),
  embedding: real("embedding").array(), // Vector embedding for matching
  createdAt: timestamp("created_at").defaultNow(),
});

// Student achievements
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type"), // олимпиада, конкурс, публикация
  year: integer("year"),
  documentUrl: text("document_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Applications for exchange programs
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  programId: integer("program_id").notNull(),
  status: text("status").notNull().default("pending"), // pending, approved, rejected, completed
  motivationLetter: text("motivation_letter"),
  selectedCourses: jsonb("selected_courses"), // Array of course IDs
  applicationDate: timestamp("application_date").defaultNow(),
  reviewDate: timestamp("review_date"),
  reviewNotes: text("review_notes"),
  documents: jsonb("documents"), // Array of document URLs
});

// Reviews and feedback
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  programId: integer("program_id").notNull(),
  applicationId: integer("application_id"),
  academicRating: integer("academic_rating"), // 1-5
  livingConditionsRating: integer("living_conditions_rating"), // 1-5
  overallRating: integer("overall_rating"), // 1-5
  academicReview: text("academic_review"),
  livingReview: text("living_review"),
  pros: text("pros"),
  cons: text("cons"),
  wouldRecommend: boolean("would_recommend"),
  createdAt: timestamp("created_at").defaultNow(),
});

// AI course recommendations
export const recommendations = pgTable("recommendations", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  courseId: integer("course_id").notNull(),
  programId: integer("program_id").notNull(),
  score: real("score").notNull(), // Similarity score 0-1
  reasoning: text("reasoning"), // AI explanation
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const studentsRelations = relations(students, ({ many }) => ({
  courses: many(studentCourses),
  achievements: many(achievements),
  applications: many(applications),
  reviews: many(reviews),
  recommendations: many(recommendations),
}));

export const universitiesRelations = relations(universities, ({ many }) => ({
  programs: many(exchangePrograms),
}));

export const exchangeProgramsRelations = relations(exchangePrograms, ({ one, many }) => ({
  university: one(universities, {
    fields: [exchangePrograms.universityId],
    references: [universities.id],
  }),
  courses: many(courses),
  applications: many(applications),
  reviews: many(reviews),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  program: one(exchangePrograms, {
    fields: [courses.programId],
    references: [exchangePrograms.id],
  }),
  recommendations: many(recommendations),
}));

export const studentCoursesRelations = relations(studentCourses, ({ one }) => ({
  student: one(students, {
    fields: [studentCourses.studentId],
    references: [students.id],
  }),
}));

export const achievementsRelations = relations(achievements, ({ one }) => ({
  student: one(students, {
    fields: [achievements.studentId],
    references: [students.id],
  }),
}));

export const applicationsRelations = relations(applications, ({ one, many }) => ({
  student: one(students, {
    fields: [applications.studentId],
    references: [students.id],
  }),
  program: one(exchangePrograms, {
    fields: [applications.programId],
    references: [exchangePrograms.id],
  }),
  reviews: many(reviews),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  student: one(students, {
    fields: [reviews.studentId],
    references: [students.id],
  }),
  program: one(exchangePrograms, {
    fields: [reviews.programId],
    references: [exchangePrograms.id],
  }),
  application: one(applications, {
    fields: [reviews.applicationId],
    references: [applications.id],
  }),
}));

export const recommendationsRelations = relations(recommendations, ({ one }) => ({
  student: one(students, {
    fields: [recommendations.studentId],
    references: [students.id],
  }),
  course: one(courses, {
    fields: [recommendations.courseId],
    references: [courses.id],
  }),
  program: one(exchangePrograms, {
    fields: [recommendations.programId],
    references: [exchangePrograms.id],
  }),
}));

// Insert schemas
export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUniversitySchema = createInsertSchema(universities).omit({
  id: true,
  createdAt: true,
});

export const insertExchangeProgramSchema = createInsertSchema(exchangePrograms).omit({
  id: true,
  createdAt: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
});

export const insertStudentCourseSchema = createInsertSchema(studentCourses).omit({
  id: true,
  createdAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  createdAt: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  applicationDate: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

// Types
export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;

export type University = typeof universities.$inferSelect;
export type InsertUniversity = z.infer<typeof insertUniversitySchema>;

export type ExchangeProgram = typeof exchangePrograms.$inferSelect;
export type InsertExchangeProgram = z.infer<typeof insertExchangeProgramSchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type StudentCourse = typeof studentCourses.$inferSelect;
export type InsertStudentCourse = z.infer<typeof insertStudentCourseSchema>;

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;

export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type Recommendation = typeof recommendations.$inferSelect;
