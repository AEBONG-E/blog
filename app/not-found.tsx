import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <h1 className="page-title">페이지를 찾을 수 없습니다</h1>
      <p>
        <Link href="/">홈으로 이동</Link>
      </p>
    </section>
  );
}
