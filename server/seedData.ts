// Sample data for testing the platform
import { storage } from "./storage";
import { aiService } from "./aiService";

export async function seedDatabase() {
  try {
    console.log("Seeding database with sample data...");

    // Create universities
    const msu = await storage.createUniversity({
      name: "Московский государственный университет",
      city: "Москва",
      country: "Россия",
      description: "Ведущий университет России, основанный в 1755 году",
      website: "https://www.msu.ru",
      contactEmail: "exchange@msu.ru",
      rating: 4.8
    });

    const itmo = await storage.createUniversity({
      name: "Университет ИТМО",
      city: "Санкт-Петербург", 
      country: "Россия",
      description: "Национальный исследовательский университет информационных технологий",
      website: "https://itmo.ru",
      contactEmail: "international@itmo.ru",
      rating: 4.7
    });

    const hse = await storage.createUniversity({
      name: "Высшая школа экономики",
      city: "Москва",
      country: "Россия", 
      description: "Ведущий исследовательский университет в области экономики и социальных наук",
      website: "https://www.hse.ru",
      contactEmail: "mobility@hse.ru",
      rating: 4.6
    });

    // Create exchange programs
    const itProgram = await storage.createExchangeProgram({
      universityId: itmo.id,
      name: "Программа обмена по информационным технологиям",
      description: "Семестровая программа для студентов IT специальностей с изучением передовых технологий",
      duration: "семестр",
      language: "Русский",
      requirements: {
        minGrade: 4.0,
        specialties: ["Информатика", "Программная инженерия", "Прикладная математика"],
        englishLevel: "B2"
      },
      availableSpots: 15,
      applicationDeadline: new Date("2025-03-15"),
      semesterStart: new Date("2025-09-01"),
      semesterEnd: new Date("2025-12-25")
    });

    const mathProgram = await storage.createExchangeProgram({
      universityId: msu.id,
      name: "Математическая программа обмена",
      description: "Программа для студентов математических специальностей на факультете ВМК",
      duration: "семестр", 
      language: "Русский",
      requirements: {
        minGrade: 4.2,
        specialties: ["Математика", "Прикладная математика", "Компьютерные науки"],
        englishLevel: "B1"
      },
      availableSpots: 10,
      applicationDeadline: new Date("2025-04-01"),
      semesterStart: new Date("2025-09-01"),
      semesterEnd: new Date("2025-12-25")
    });

    const econProgram = await storage.createExchangeProgram({
      universityId: hse.id,
      name: "Программа обмена по экономике и управлению",
      description: "Междисциплинарная программа для студентов экономических специальностей",
      duration: "семестр",
      language: "Английский",
      requirements: {
        minGrade: 4.0,
        specialties: ["Экономика", "Менеджмент", "Финансы"],
        englishLevel: "C1"
      },
      availableSpots: 20,
      applicationDeadline: new Date("2025-03-20"),
      semesterStart: new Date("2025-09-01"), 
      semesterEnd: new Date("2025-12-25")
    });

    // Create courses with embeddings
    const courses = [
      // IT Courses for ITMO
      {
        programId: itProgram.id,
        name: "Алгоритмы и структуры данных",
        code: "CS301",
        description: "Изучение основных алгоритмов сортировки, поиска, работы с деревьями и графами. Анализ сложности алгоритмов.",
        credits: 4,
        prerequisites: "Основы программирования",
        syllabus: "Сортировки, хеш-таблицы, деревья поиска, графы, динамическое программирование",
        instructor: "А.И. Петров"
      },
      {
        programId: itProgram.id,
        name: "Машинное обучение",
        code: "CS401",
        description: "Введение в методы машинного обучения: линейная регрессия, нейронные сети, случайные леса",
        credits: 3,
        prerequisites: "Линейная алгебра, Теория вероятностей",
        syllabus: "Supervised learning, unsupervised learning, deep learning, reinforcement learning",
        instructor: "М.В. Сидорова"
      },
      {
        programId: itProgram.id,
        name: "Веб-разработка",
        code: "CS201",
        description: "Создание современных веб-приложений с использованием React, Node.js и баз данных",
        credits: 4,
        prerequisites: "JavaScript, Основы программирования", 
        syllabus: "HTML/CSS, JavaScript, React, Node.js, MongoDB, REST API",
        instructor: "Д.С. Козлов"
      },
      // Math Courses for MSU
      {
        programId: mathProgram.id,
        name: "Функциональный анализ", 
        code: "MATH401",
        description: "Изучение функциональных пространств, операторов и их свойств в математическом анализе",
        credits: 5,
        prerequisites: "Математический анализ, Линейная алгебра",
        syllabus: "Банаховы пространства, гильбертовы пространства, линейные операторы",
        instructor: "В.А. Волков"
      },
      {
        programId: mathProgram.id,
        name: "Дискретная математика",
        code: "MATH201", 
        description: "Основы дискретной математики: комбинatorика, теория графов, булевы функции",
        credits: 3,
        prerequisites: "Основы математики",
        syllabus: "Комбинаторика, графы, логика, множества, отношения",
        instructor: "Н.И. Кузнецов"
      },
      // Economics Courses for HSE
      {
        programId: econProgram.id,
        name: "Microeconomics",
        code: "ECON301",
        description: "Advanced microeconomic theory covering consumer behavior, firm theory, and market structures",
        credits: 4,
        prerequisites: "Principles of Economics, Calculus",
        syllabus: "Consumer theory, producer theory, market equilibrium, game theory",
        instructor: "Dr. A. Smith"
      },
      {
        programId: econProgram.id,
        name: "Data Analysis in Economics", 
        code: "ECON401",
        description: "Statistical methods and econometric techniques for economic data analysis using R and Python",
        credits: 3,
        prerequisites: "Statistics, Economics",
        syllabus: "Regression analysis, time series, panel data, causal inference",
        instructor: "Prof. E. Johnson"
      }
    ];

    // Create courses with embeddings
    for (const courseData of courses) {
      try {
        const embedding = await aiService.generateEmbedding(
          `${courseData.name} ${courseData.description} ${courseData.syllabus}`
        );
        await storage.createCourse({
          ...courseData, 
          embedding
        });
      } catch (error) {
        console.warn(`Failed to create embedding for course ${courseData.name}:`, error);
        // Create course without embedding
        await storage.createCourse(courseData);
      }
    }

    // Create sample student
    const student = await storage.createStudent({
      fullName: "Иван Иванович Иванов",
      email: "ivan.ivanov@student.ru",
      university: "Московский государственный университет",
      faculty: "ВМК",
      studentId: "123456789",
      specialtyCode: "01.03.02",
      specialty: "Прикладная математика и информатика",
      level: "Бакалавриат",
      course: 3,
      studyForm: "Очное",
      financing: "Бюджет",
      englishLevel: "B2",
      profileImageUrl: null,
      averageGrade: 4.5
    });

    // Add student courses with embeddings
    const studentCourses = [
      {
        studentId: student.id,
        courseName: "Алгоритмы и структуры данных",
        courseCode: "CS201",
        grade: "5",
        credits: 4,
        semester: "Осенний",
        year: 2024,
        description: "Изучение основных алгоритмов и структур данных. Сортировки, поиск, деревья, графы."
      },
      {
        studentId: student.id,
        courseName: "Базы данных",
        courseCode: "CS301", 
        grade: "4",
        credits: 3,
        semester: "Весенний",
        year: 2024,
        description: "Проектирование реляционных баз данных, SQL, нормализация, индексы."
      },
      {
        studentId: student.id,
        courseName: "Линейная алгебра",
        courseCode: "MATH101",
        grade: "5", 
        credits: 4,
        semester: "Осенний",
        year: 2023,
        description: "Векторные пространства, матрицы, системы линейных уравнений, собственные значения."
      },
      {
        studentId: student.id,
        courseName: "Теория вероятностей",
        courseCode: "MATH201",
        grade: "4",
        credits: 3,
        semester: "Весенний", 
        year: 2024,
        description: "Основы теории вероятностей, случайные величины, распределения, предельные теоремы."
      }
    ];

    for (const courseData of studentCourses) {
      try {
        const embedding = await aiService.generateEmbedding(
          `${courseData.courseName} ${courseData.description}`
        );
        await storage.createStudentCourse({
          ...courseData,
          embedding
        });
      } catch (error) {
        console.warn(`Failed to create embedding for student course ${courseData.courseName}:`, error);
        await storage.createStudentCourse(courseData);
      }
    }

    // Add student achievements
    await storage.createAchievement({
      studentId: student.id,
      title: "Победитель олимпиады по программированию",
      description: "1 место в региональной олимпиаде по программированию среди студентов",
      type: "олимпиада",
      year: 2024
    });

    await storage.createAchievement({
      studentId: student.id,
      title: "Публикация в научном журнале",
      description: "Статья по алгоритмам машинного обучения в журнале 'Прикладная информатика'",
      type: "публикация", 
      year: 2024
    });

    console.log("Database seeded successfully!");
    console.log(`Created:
    - 3 universities
    - 3 exchange programs  
    - 7 courses
    - 1 student profile
    - 4 student courses
    - 2 achievements`);

    return { student, universities: [msu, itmo, hse], programs: [itProgram, mathProgram, econProgram] };

  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}