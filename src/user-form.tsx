import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "./store/features/userSlice"


interface UserFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (user: Partial<User>) => void
  initialData?: User
}

export default function UserForm({ open, onClose, onSubmit, initialData }: UserFormProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    phone: "",
    address: {
      city: "",
      zipcode: "",
    },
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#111]">{initialData ? "Edit User" : "Add User"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#111]">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#111]">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone"  className="text-[#111]">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city" className="text-[#111]">City</Label>
            <Input
              id="city"
              value={formData.address?.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, city: e.target.value, zipcode: formData.address?.zipcode || "" },
                })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipcode" className="text-[#111]">Zip Code</Label>
            <Input
              id="zipcode"
              value={formData.address?.zipcode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, city: formData.address?.city || "", zipcode: e.target.value },
                })
              }
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" className="text-[#111]" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{initialData ? "Update" : "Add"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

