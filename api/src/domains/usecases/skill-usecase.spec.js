const { MissingParamError } = require("../../utils/errors")
const SkillUseCase = require("./skill-usecase")

const makeSkillRepository = () => {
  class SkillRepository {
    async getBySkills(skills) {
      this.skills = skills
      return this.result
    }
  }

  const skillRepositorySpy = new SkillRepository()
  skillRepositorySpy.result = [
    {
      id: 3,
      title: "Biology Skill",
      subject_id: 2,
    },
    {
      id: 4,
      title: "Physics Skill",
      subject_id: 2,
    },
    {
      id: 6,
      title: "American History Skill",
      subject_id: 4,
    }
  ]

  return skillRepositorySpy
}

const makeStudentRepository = () => {
  class StudentRepository {
    async getById(id) {
      this.id = id
      return this.result
    }
  }

  const studentRepositorySpy = new StudentRepository()
  studentRepositorySpy.result = {
    id: 1,
    name: "Tester",
    email: "test@soraschools.com",
    house: "Heqet",
    skills: [
      { id: 3, level: 2 },
      { id: 4, level: 3 },
      { id: 6, level: 1 },
    ],
  }

  return studentRepositorySpy
}

const makeSut = () => {
  const skillRepositorySpy = makeSkillRepository()
  const studentRepositorySpy = makeStudentRepository()
  const sut = new SkillUseCase({
    skillRepository: skillRepositorySpy,
    studentRepository: studentRepositorySpy
  })
  return {
    sut,
    skillRepositorySpy,
    studentRepositorySpy
  }
}

describe('Skill UseCase', () => {


  describe('Calling listByStudent', () => {
    test('Should throw if required parameters are not provided', async () => {
      const { sut } = makeSut()
      const promise = sut.listByStudent()
      await expect(promise).rejects.toThrow()
    })

    test('Should throw if student id is not provided', async () => {
      const { sut } = makeSut()
      const promise = sut.listByStudent()
      await expect(promise).rejects.toThrow(new MissingParamError('Student ID'))
    })

    test('Should return object if required parameters are provided', async () => {
      const { sut, skillRepositorySpy } = makeSut()
      const result = await sut.listByStudent(1)
      expect(result).toEqual(skillRepositorySpy.result)
    })

    test('Should throw if required parameters are provided but without result', async () => {
      const { sut, studentRepositorySpy } = makeSut()
      studentRepositorySpy.result = null
      const promise = sut.listByStudent(0)
      await expect(promise).rejects.toThrow()
    })

    test('Should throw if invalid dependencies are provided', async () => {
      const skillRepository = makeSkillRepository()
      const invalid = {}
      const suts = [].concat(
        new SkillUseCase(),
        new SkillUseCase({}),
        new SkillUseCase({
          skillRepository: invalid
        }),
        new SkillUseCase({
          skillRepository,
          studentRepository: invalid
        })
      )
      for (const sut of suts) {
        const promise = sut.listByStudent(1)
        await expect(promise).rejects.toThrow()
      }
    })
  })

})
