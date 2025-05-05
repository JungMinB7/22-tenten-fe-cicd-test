export default function PostCourseSelector() {
  return (
    <div className="border-b-[0.5px] border-b-textColor px-10 py-6 bg-bgColor">
      <select
        name="post-course"
        className="bg-transparent focus:outline-none font-bold"
        defaultValue="카카오테크 부트캠프 2기"
      >
        <option>전체</option>
        <option>카카오테크 부트캠프 2기</option>
      </select>
    </div>
  );
}
