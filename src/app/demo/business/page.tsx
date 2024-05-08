"use client";
import React from "react";
import CountDown from "./CountDown";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { animals } from "./data";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
  Checkbox,
} from "@nextui-org/react";
import { Pencil, Plus, X } from "lucide-react";

type DurationType = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Page() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const now = dayjs();
  const endDateTime = "2024-05-15 22:03:20";
  const endDate = dayjs(endDateTime);
  dayjs.extend(duration);
  const durationInfo = dayjs.duration(endDate.diff(now));

  const durationObj: DurationType = {
    years: durationInfo.years(),
    months: durationInfo.months(),
    days: durationInfo.days(),
    hours: durationInfo.hours(),
    minutes: durationInfo.minutes(),
    seconds: durationInfo.seconds(),
  };

  return (
    <div className="container mx-auto p-3">
      <div className="full md:flex md:justify-between md:items-center">
        <Autocomplete
          defaultItems={animals}
          label="Project"
          placeholder="Select an project"
          className="max-w-xs"
        >
          {(animal) => (
            <AutocompleteItem key={animal.value}>
              {animal.label}
            </AutocompleteItem>
          )}
        </Autocomplete>
        <CountDown durationInfo={durationObj} endDateTime={endDateTime} />
      </div>
      <Accordion selectionMode="multiple" defaultExpandedKeys={["2", "3"]}>
        <AccordionItem
          key="1"
          aria-label="Chung Miller"
          startContent={
            <Avatar
              isBordered
              color="primary"
              radius="lg"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
          }
          subtitle="4 unread messages"
          title="企业概况"
        >
          {defaultContent}
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Janelle Lenard"
          startContent={<X />}
          subtitle="3 incompleted steps"
          title="商务跟踪情况"
        >
          <div className="px-4">
            <Accordion selectionMode="multiple">
              <AccordionItem
                key="1"
                aria-label="Chung Miller"
                startContent={
                  <Avatar
                    isBordered
                    color="primary"
                    radius="lg"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  />
                }
                subtitle={
                  <p className="flex">
                    4 items,
                    <span className="text-primary ml-1">1 undone.</span>
                  </p>
                }
                title="建议书阶段"
              >
                <div className="space-y-2 p-3 rounded-xl border ">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Checkbox defaultSelected lineThrough>
                        建设内容简介
                      </Checkbox>
                      <div className="flex items-center gap-2">
                        <Button isIconOnly size="sm" color={"secondary"}>
                          e
                        </Button>
                        <Button isIconOnly size="sm" color="default">
                          x
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Checkbox defaultSelected lineThrough>
                        跟踪进展
                      </Checkbox>
                      <div className="flex items-center gap-2">
                        <Button isIconOnly size="sm" color={"secondary"}>
                          e
                        </Button>
                        <Button isIconOnly size="sm" color="default">
                          x
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Checkbox lineThrough>跟踪进展</Checkbox>
                      <div className="flex items-center gap-2">
                        <Button isIconOnly size="sm" color={"secondary"}>
                          e
                        </Button>
                        <Button isIconOnly size="sm" color="default">
                          x
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Checkbox defaultSelected lineThrough>
                        跟踪进展
                      </Checkbox>
                      <div className="flex items-center gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          color={"secondary"}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          color="default"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <form action="" className="flex items-center gap-3">
                    <Input size="sm" type="email" label="待办事项" />
                    <Button isIconOnly size="md" color="primary">
                      <Plus />
                    </Button>
                  </form>
                </div>
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Janelle Lenard"
                startContent={
                  <Avatar
                    isBordered
                    color="success"
                    radius="lg"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                }
                subtitle="3 incompleted steps"
                title="方案设计阶段"
              >
                {defaultContent}
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Zoey Lang"
                startContent={
                  <Avatar
                    isBordered
                    color="warning"
                    radius="lg"
                    src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                  />
                }
                subtitle={
                  <p className="flex">
                    2 issues to
                    <span className="text-primary ml-1">fix now</span>
                  </p>
                }
                title="可研阶段"
              >
                {defaultContent}
              </AccordionItem>
              <AccordionItem
                key="4"
                aria-label="Zoey Lang"
                startContent={
                  <Avatar
                    isBordered
                    color="warning"
                    radius="lg"
                    src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                  />
                }
                subtitle={
                  <p className="flex">
                    2 issues to
                    <span className="text-primary ml-1">fix now</span>
                  </p>
                }
                title="设计/总包投标阶段"
              >
                {defaultContent}
              </AccordionItem>
            </Accordion>
          </div>
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Zoey Lang"
          startContent={
            <Avatar
              isBordered
              color="warning"
              radius="lg"
              src="https://i.pravatar.cc/150?u=a04258114e29026702d"
            />
          }
          subtitle={
            <p className="flex">
              2 issues to<span className="text-primary ml-1">fix now</span>
            </p>
          }
          title="技术跟踪情况"
        >
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
