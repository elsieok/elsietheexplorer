import AdminLayout from "@/app/components/admin/AdminLayout.js";
import PostForm from "@/app/components/admin/PostForm.js";

export default function CreatePost() {
    return (
        <AdminLayout>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>
                <PostForm />
            </div>
        </AdminLayout>
    )
}