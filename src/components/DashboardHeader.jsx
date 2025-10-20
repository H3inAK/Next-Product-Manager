"use client";

import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardHeader = ({ steps = [], currentPageTitle = "" }) => {
  const router = useRouter();
  
  return (
    <header className="flex justify-between items-center shadow-sm px-6 py-2">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {steps.map((step, index) => {
              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={step.href}>
                      {step.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </React.Fragment>
              );
            })}
            <BreadcrumbItem>
              <BreadcrumbPage>{currentPageTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-1.5">
        <Button
          onClick={() => router.back()}
          variant="outline"
          size="icon"
          className="size-8"
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={() => router.forward()}
          variant="outline"
          size="icon"
          className="size-8"
        >
          <ChevronRight />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
