import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
export default function Footer({ data }) {
  return (
    <footer className="footer flex space-between m-flex-col">
      <div className="flex gap-10 align-end m-order-2 m-mx-auto">
        <div>
          {data?.careers?.visible !== false && (
            <a className="button-secondary" href={data?.careers?.link}>
              {data?.careers?.text}
            </a>
          )}
          {data?.press?.visible !== false && (
            <a className="button-secondary" href={data?.press?.link}>
              {data?.press?.text}
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col space-between capitalize m-order-3 m-mt50">
        <div className="flex flex-col align-center gap-20">
          <div className="flex flex-col align-center">
            <a href={data?.phone?.link ?? ""}>{data?.phone?.text}</a>
            <a href={data?.address?.link ?? ""} target="_blank" rel="noopener noreferrer">{data?.address?.text}</a>
          </div>
          <a className="lowercase" href={data?.handle?.link ?? ""} target="_blank" rel="noopener noreferrer">{data?.handle?.text}</a>
        </div>
        <p className="tagline">{data?.tagline}</p>
      </div>
      {data?.image && (
        <div className="piano ratio-183-197 pos-rel w-180px m-order-1 m-mb60 m-mx-auto">
          <Image
          className="bg-image contain"
            src={urlFor(data.image).url()}
            alt=""
            width={183}
            height={197}
          />
        </div>
      )}
    </footer>
  );
}
