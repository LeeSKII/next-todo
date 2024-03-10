import Link from "next/link";
import LinkItem from "@/components/tailwind/LinkItem";

export default function Page() {
  const outline = [
    { href: "/nextui/tailwind/overview", title: "overview" },
    { href: "/nextui/tailwind/color", title: "color" },
    { href: "/nextui/tailwind/spacing", title: "spacing" },
  ];
  return (
    <div className="container mx-auto mt-3 px-5 ">
      <div className="flex flex-col gap-3">
        {outline.map((item) => (
          <LinkItem key={`${item.href}-${item.title}`} href={item.href}>
            {item.title}
          </LinkItem>
        ))}
      </div>
    </div>
  );
}
