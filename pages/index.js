import Link from 'next/link';

function HomePage() {
    return <>
        <div className="title">React 練習專案</div>
        <div className="cover">歡迎光臨我的頁面</div>
        <Link href="/accounting">
            <div  className="btn">點此開始</div>
        </Link>
        </>
}
export default HomePage;

