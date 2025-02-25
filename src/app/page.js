import { ChartIndex } from "@/components/ChartIndex";
import IndexCard from "@/components/indexCard";
import { DataTableDemo } from "@/components/TableIndex";
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import { Separator } from "@/components/ui/separator"
import BlurText from "@/components/BlurText";


export default function Home() {
  return (
    <div className="container">
      <main>
      <Row>
        <Col sm={12}><h1 className="pb-3 ps-0 pt-3"><BlurText text="Dashboard" animateBy="letters" /></h1>  <Separator /> </Col>
        <Col sm={12} md={12} className="mt-3">
        {/* <h3>Records</h3> */}
        <IndexCard />
        </Col> 
          <Col md={12}>
          <DataTableDemo />
          
          </Col>
          {/* <Col md={6}>
          <ChartIndex />
          </Col> */}
      </Row>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
