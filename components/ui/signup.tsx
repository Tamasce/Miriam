"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";

export function SignupFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname" className='e-textlabel'>Nome</Label>
            <Input id='Subject' name='Subject' type='text' style={{width:'100%'}} className='e-field'/>
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" className='e-textlabel'>Cellulare</Label>
            <Input id='cellulare' name='Cellulare' type='text' style={{width:'100%'}} className='e-field'/>
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
        <DropDownListComponent id='servizio' dataSource={['Extension & Laminazione','Ricostruzione & Semipermanente','Smontaggio/Sopracciglia/Baffetto']} placeholder='Scegli un servizio' data-name='Servizio' value={null} className='e-field e-dropdownlist text-[10px]'>
        </DropDownListComponent>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Esigenze</Label>
          <Input id='Description' name='Description'  style={{width:'100%', height:'60px !important', resize: 'vertical'}} className='e-field' />
        </LabelInputContainer>
        

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
