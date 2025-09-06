"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Trash2, Plus, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcut for adding new todo (Ctrl+N)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "n") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      }
      setTodos((prev) => [...prev, todo])
      setNewTodo("")
    }
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()

    if (!draggedItem || draggedItem === targetId) return

    const draggedIndex = todos.findIndex((todo) => todo.id === draggedItem)
    const targetIndex = todos.findIndex((todo) => todo.id === targetId)

    if (draggedIndex === -1 || targetIndex === -1) return

    const newTodos = [...todos]
    const [draggedTodo] = newTodos.splice(draggedIndex, 1)
    newTodos.splice(targetIndex, 0, draggedTodo)

    setTodos(newTodos)
    setDraggedItem(null)
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const progressPercentage = todos.length > 0 ? (completedCount / todos.length) * 100 : 0

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Ma Todo List</h1>
          <p className="text-muted-foreground">Organisez vos tâches avec style</p>
        </div>

        {/* Progress Bar */}
        {todos.length > 0 && (
          <Card className="p-6 mb-6 bg-card border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Progression</span>
              <span className="text-sm text-muted-foreground">
                {completedCount}/{todos.length} terminées
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3 transition-all duration-500 ease-out" />
            <div className="mt-2 text-xs text-muted-foreground text-center">
              {Math.round(progressPercentage)}% complété
            </div>
          </Card>
        )}

        {/* Add Todo Form */}
        <Card className="p-6 mb-6 bg-card border-border">
          <div className="flex gap-3">
            <Input
              ref={inputRef}
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Ajouter une nouvelle tâche... (Ctrl+N)"
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              className="flex-1 bg-input border-border"
            />
            <Button onClick={addTodo} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.map((todo, index) => (
            <Card
              key={todo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, todo.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, todo.id)}
              className={cn(
                "p-4 bg-card border-border transition-all duration-300 hover:shadow-md cursor-move",
                "animate-in slide-in-from-top-2 fade-in-0",
                draggedItem === todo.id && "opacity-50 scale-95",
                todo.completed && "opacity-75 bg-muted/30",
              )}
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="flex items-center gap-4">
                <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />

                <div className="relative">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    className={cn(
                      "w-5 h-5 transition-all duration-300 ease-out",
                      "border-2 border-gray-300 bg-white",
                      "data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500",
                      "data-[state=checked]:scale-110",
                      "hover:scale-105 hover:border-emerald-400",
                      "focus:ring-2 focus:ring-emerald-500/20",
                    )}
                  />
                  {todo.completed && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                    </div>
                  )}
                </div>

                <span
                  className={cn(
                    "flex-1 transition-all duration-300 ease-out select-none",
                    todo.completed
                      ? "line-through text-muted-foreground transform scale-95"
                      : "text-foreground transform scale-100",
                  )}
                >
                  {todo.text}
                </span>

                {todo.completed && (
                  <div className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full animate-in zoom-in-50 duration-300">
                    ✓ Terminé
                  </div>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTodo(todo.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200 hover:scale-105"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {todos.length === 0 && (
          <Card className="p-12 text-center bg-card border-border animate-in fade-in-0 duration-500">
            <div className="text-muted-foreground">
              <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Aucune tâche pour le moment</p>
              <p className="text-sm">Ajoutez votre première tâche ci-dessus ou appuyez sur Ctrl+N</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
