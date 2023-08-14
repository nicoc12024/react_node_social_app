import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

export const useComments = (postId) => {
  // State to manage the comment's description, editing status, and menu open state
  const [description, setDescription] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [menuOpen, setMenuOpen] = useState({});

  const queryClient = useQueryClient();

  const menuRef = useRef(null);
  const textAreaRef = useRef(null);

  // Function to check if the click is outside of the menu
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen({}); // Resetting the menuOpen state to an empty object
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
    if (editingCommentId !== null && textAreaRef.current) {
      textAreaRef.current.focus();
      const length = textAreaRef.current.value.length;
      textAreaRef.current.selectionStart = length;
      textAreaRef.current.selectionEnd = length;
    }
  }, [editingCommentId]);

  // Function to toggle the menu open state for a specific comment
  const toggleMenuOpen = (commentId) => {
    setMenuOpen((prevMenuOpen) => ({
      ...prevMenuOpen,
      [commentId]: !prevMenuOpen[commentId],
    }));
  };

  // Hook to handle fetching comments for a given post (from the backend we get numberOfComments from each post)
  const { isLoading, data } = useQuery(["comments", postId], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  // Add comment mutation for a given comment id and post id, updates the comments and posts queries
  const addCommentInsidePostMutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", postId]);
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  // On submit comment inside post
  const handleSharePost = (e) => {
    e.preventDefault();
    addCommentInsidePostMutation.mutate({ description, postId });
    setDescription("");
  };

  // Delete comment mutation for a given comment id and post id, updates the comments and posts queries
  const deleteCommentMutation = useMutation(
    (commentId) => {
      return makeRequest.delete("/comments/" + commentId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", postId]);
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  // Edit comment mutation
  const editCommentMutation = useMutation(
    (updatedComment) => {
      return makeRequest.put("/comments/" + updatedComment.id, updatedComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", postId]);
        setEditingCommentId(null);
      },
    }
  );

  // On edit comment
  const handleEditComment = (comment) => {
    editCommentMutation.mutate({
      id: comment.id,
      description: editedDescription,
    });
  };

  // On delete comment
  const handleDeleteComment = (commentId) => {
    deleteCommentMutation.mutate(commentId);
  };

  return {
    description,
    setDescription,
    editingCommentId,
    setEditingCommentId,
    editedDescription,
    setEditedDescription,
    menuOpen,
    toggleMenuOpen,
    textAreaRef,
    isLoading,
    data,
    handleSharePost,
    handleEditComment,
    handleDeleteComment,
    menuRef,
  };
};
