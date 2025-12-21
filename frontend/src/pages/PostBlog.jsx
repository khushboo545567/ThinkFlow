import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

const PostBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Link,
      Image,
    ],
    content: "",
  });

  // 🔹 Image upload handler
  const handleImageUpload = async (file) => {
    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // insert image into editor
      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    const htmlContent = editor.getHTML();

    console.log({
      title,
      content: htmlContent,
      category,
    });
  };

  if (!editor) return null;

  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 pt-16">
      <div className="">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
          What’s going on your mind?
        </h1>

        <div className="bg-white dark:bg-gray-900  p-10 space-y-6">
          {/* Title */}
          <label htmlFor="" className="font-semibold dark:text-white">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 mt-3 dark:text-gray-200"
          />

          {/* Toolbar */}
          <div className="flex gap-2 flex-wrap border-b border-gray-300 dark:border-gray-700 pb-3">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="editor-btn"
            >
              <span className="font-bold bg-gray-300 px-2 rounded-full">B</span>
            </button>

            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className="editor-btn"
            >
              <span className="font-italic bg-gray-300 px-2 rounded-full">
                I
              </span>{" "}
            </button>

            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className="editor-btn"
            >
              <span className="font-italic bg-gray-300 px-2 rounded-full">
                H1
              </span>
            </button>

            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className="editor-btn"
            >
              <span className="font-italic bg-gray-300 px-2 rounded-full">
                H2
              </span>
            </button>

            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className="editor-btn"
            >
              <span className="font-italic bg-gray-300 px-2 rounded-full">
                • List
              </span>
            </button>

            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className="editor-btn"
            >
              <span className="font-italic bg-gray-300 px-2 rounded-full">
                1. List
              </span>
            </button>

            {/* Image Upload */}
            <label className="editor-btn cursor-pointer bg-gray-300 px-2 rounded-full">
              {uploading ? "Uploading..." : "🖼 Image"}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleImageUpload(e.target.files[0])}
              />
            </label>
          </div>

          {/* Editor */}
          <div className="font-semibold dark:text-white">Tell your story</div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 min-h-[200px]">
            <EditorContent editor={editor} />
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select category</option>
            <option value="tech">Technology</option>
            <option value="education">Education</option>
            <option value="food">Food</option>
          </select>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-black dark:bg-white dark:text-black text-white"
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostBlog;
