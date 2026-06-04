import AdminLayout from "@/app/components/admin/AdminLayout";
import PostForm from "@/app/components/admin/PostForm";

export default function CreatePost() {
  return (
    <AdminLayout>
      <div>
        <div style={{ marginBottom: "1.75rem" }}>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "1.625rem",
              color: "var(--gray-900)",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            New post
          </h1>
          <p style={{ color: "var(--gray-400)", fontSize: "0.875rem", margin: "0.25rem 0 0" }}>
            Write and publish a new blog post.
          </p>
        </div>
        <PostForm />
      </div>
    </AdminLayout>
  );
}