import Template from '../src/components/template';
import Link from 'next/link';

function accounting() {
  return (
    <>
      <Template />
      <Link href="/">
            <div  className="btn">返回首頁</div>
        </Link>
    </>
  );
}

export default accounting;