import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { makeRequest } from "../../axios";

export const usePostLogic = ({ currentUser, post }) => {
  // State definitions
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState(post.description);
  const [showError, setShowError] = useState(false);

  const menuRef = useRef(null);
  const textAreaRef = useRef(null);

  const queryClient = useQueryClient();

  // Function to check if the click is outside of the menu
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  // Attach the event listener on mount, and clean up on unmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Automatically focus and move cursor to the end when entering edit mode
  useEffect(() => {
    if (editMode && textAreaRef.current) {
      textAreaRef.current.focus();
      const length = textAreaRef.current.value.length;
      textAreaRef.current.selectionStart = length;
      textAreaRef.current.selectionEnd = length;
    }
  }, [editMode, textAreaRef]);

  // Get likes for the post
  const { isLoading, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  // Delete mutation for a post
  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  // Like/Unlike mutation for a post
  const likeUnlikeMutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  // Edit mutation for a post
  const editMutation = useMutation(
    (updatedPost) => {
      return makeRequest.put("/posts/" + post.id, updatedPost);
    },
    {
      onSuccess: () => {
        setEditMode(false);
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  // Handlers for like/unlike, delete, and edit
  const handleLike = () => {
    likeUnlikeMutation.mutate(data.includes(currentUser.id));
  };

  const handlePostDelete = () => {
    deleteMutation.mutate(post.id);
  };

  const handleEdit = () => {
    if (editedDescription === "") {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }
    editMutation.mutate({ description: editedDescription });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedDescription(post.description);
  };

  // Automatically exit edit mode if this component is reused for a different post
  useEffect(() => {
    setEditMode(false);
    setEditedDescription(post.description);
  }, [post.id, post.description, setEditMode, setEditedDescription]);

  return {
    setMenuOpen,
    menuOpen,
    menuRef,
    handlePostDelete,
    setEditMode,
    editMode,
    editedDescription,
    setEditedDescription,
    textAreaRef,
    isLoading,
    data,
    handleEdit,
    handleLike,
    setCommentOpen,
    commentOpen,
    showError,
    handleCancelEdit,
  };
};
