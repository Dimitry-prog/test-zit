export type TodoType = {
  id: string
  parentId: string | null
  title: string
  description: string
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date
  deadline: Date
  remindDate: Date
}