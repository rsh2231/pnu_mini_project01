"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Button01 from "../etc/Button01";

// 타입 정의
interface Post {
  id: number;
  title: string;
  content: string;
  writer: string;
  createDate: string;
}

// 디바운스 훅
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const BoardList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms 딜레이 적용

  const [selectedWriter, setSelectedWriter] = useState("전체");
  const [sortOption, setSortOption] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const router = useRouter();
  const springurl = process.env.NEXT_PUBLIC_SPRING_URL;

  // 총 게시글 수 (서버에서 total 필드가 없으면 임시로 처리)
  const [totalPosts, setTotalPosts] = useState(0);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append("page", currentPage.toString());
      params.append("size", postsPerPage.toString());
      if (debouncedSearchTerm.trim() !== "") {
        params.append("search", debouncedSearchTerm.trim());
      }
      if (selectedWriter !== "전체") {
        params.append("writer", selectedWriter);
      }
      if (sortOption) {
        params.append("sort", sortOption);
      }

      const url = `${springurl}/api/posts?${params.toString()}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("게시글 데이터를 불러오지 못했습니다.");
      }

      const data = await res.json();

      // content.dashboards 배열을 매핑
      const mappedPosts = data.content.dashboards.map((item: any) => ({
        id: item.dash_id,
        title: item.title,
        content: item.content,
        writer: item.nickname,
        createDate: item.created_at,
      }));

      setPosts(mappedPosts);

      // 서버에서 total 필드가 없으면 dashboards 배열 길이로 임시 설정
      setTotalPosts(data.content.total || mappedPosts.length);
    } catch (err: any) {
      setError(err.message || "오류가 발생했습니다.");
      setPosts([]);
      setTotalPosts(0);
    } finally {
      setLoading(false);
    }
  }, [springurl, currentPage, postsPerPage, debouncedSearchTerm, selectedWriter, sortOption]);

  // 조건 변경 시 데이터 재요청
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // 검색어, 작성자, 정렬 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedWriter, sortOption]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-6">
      {/* 제목 및 글쓰기 */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">게시판 목록</h2>
        <Button01 caption="글쓰기" bg_color="blue" onClick={() => router.push("/dashboard/write")} />
      </div>

      {/* 검색, 필터, 정렬 */}
      <div className="flex flex-wrap gap-2 items-center">
        <input
          type="text"
          placeholder="제목 또는 내용 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />

        <select
          value={selectedWriter}
          onChange={(e) => setSelectedWriter(e.target.value)}
          className="px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
        >
          <option value="전체">전체 작성자</option>
          {[...new Set(posts.map((post) => post.writer))].map((writer) => (
            <option key={writer} value={writer}>
              {writer}
            </option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="title">제목순</option>
          <option value="writer">작성자순</option>
        </select>
      </div>

      {/* 게시글 목록 */}
      {loading ? (
        <p className="text-center py-10 text-gray-500">로딩 중...</p>
      ) : error ? (
        <p className="text-center py-10 text-red-500">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500 text-center py-10">검색 결과가 없습니다.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            onClick={() => router.push(`/dashboard/${post.id}`)}
            className="cursor-pointer border p-4 rounded shadow hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{post.title}</h3>
            <p className="text-sm text-gray-500">
              작성자: {post.writer} | 작성일: {new Date(post.createDate).toLocaleString()}
            </p>
            <div
              className="mt-2 text-gray-700 dark:text-gray-300 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        ))
      )}

      {/* 페이지네이션 */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BoardList;
