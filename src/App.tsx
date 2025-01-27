
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Loader2 } from "lucide-react"
import UserForm from "./user-form"
import { User, fetchUsers, deleteUser, updateUser, addUser } from "./store/features/userSlice"
import { useAppDispatch, useAppSelector } from "./store/store"


export default function App() {
  const dispatch = useAppDispatch()
  const { users, loading, error } = useAppSelector((state) => state.users)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id))
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setShowForm(true)
  }
  
  const onClose = () =>{
    setShowForm(false)
    setEditingUser(undefined)
  }
  
  const handleAdd =() =>{
    setEditingUser(undefined)
    setShowForm(true)
  }

  const handleSubmit = (userData: Partial<User>) => {
    if (editingUser) {
      dispatch(updateUser({ ...userData, id: editingUser.id } as User))
    } else {
      dispatch(
        addUser({
          ...userData,
          id: Math.max(...users.map((u) => u.id)) + 1,
        } as User),
      )
    }
    setEditingUser(undefined)
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return <div className="flex h-[50vh] items-center justify-center text-destructive">Error: {error}</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button onClick={handleAdd}>Add User</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Zip Code</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.address.city}</TableCell>
                <TableCell>{user.address.zipcode}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(user)}>
                      <Pencil className="h-4 w-4 text-[#111]" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(user.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserForm
        open={showForm}
        onClose={onClose}
        onSubmit={handleSubmit}
        initialData={editingUser}
      />
    </div>
  )
}
