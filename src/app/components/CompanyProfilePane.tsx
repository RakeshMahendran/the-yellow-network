import React, { useState } from "react";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { StartupType } from "../interfaces";
import { GrFormClose } from "react-icons/gr";
import { FaSpinner } from "react-icons/fa";
import api from "./Axios"
interface userInfo {
  email: string;
  first_name: string;
}
import axios from 'axios'

interface CompanyProfilePaneProps {
  companyData: StartupType;
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
  openState: boolean;
  userInfo: userInfo;
  expanded: boolean;
  toggleWidth: () => void;
  mailData: any;
  setMailData: React.Dispatch<React.SetStateAction<any>>;
}

const CompanyProfilePane: React.FC<CompanyProfilePaneProps> = ({
  companyData,
  setOpenState,
  openState,
  userInfo,
  expanded,
  toggleWidth,
  mailData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openPane = () => {
    setOpenState(false);
  };

  const sendEmail = async () => {
    try {
      setIsLoading(true);
      await axios.post("http://172.174.112.166:8000/api/email/send-email/", {
        subject: "Demo",
        template_name: "email_template.html",
        context: { userInfo, mailData, companyData },
        recipient_list: "lathiesh@theyellow.network",
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(openState, "companyData");
  console.log("mailDataaaaaa", mailData);
  console.log("userInfoooo--->", userInfo);
  console.log("companyData", companyData);

  return (
    <>
      {openState && (
        <div
          className={`h-screen bg-white shadow-md flex flex-col gap-y-4 py-8 overflow-auto ${expanded ? "absolute right-0 lg:w-[500px] xl:w-[900px]" : ""
            } `}
        >
          <div className="mx-6 flex flex-col -mt-5 gap-6">
            <div className="flex justify-between">
              {!expanded ? (
                <div className=" -ml-2 cursor-pointer" onClick={toggleWidth}>
                  <MdOutlineKeyboardDoubleArrowLeft size={23} />
                </div>
              ) : (
                <div className=" -ml-2 cursor-pointer" onClick={toggleWidth}>
                  <MdOutlineKeyboardDoubleArrowRight size={23} />
                </div>
              )}
              <div className="mx-4 cursor-pointer" onClick={openPane}>
                <GrFormClose size={23} />
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex flex-row justify-between items-center -mt-3 text-blue-400 font-semibold text-xl">
                <div>{companyData?.startup_name}</div>
                <div
                  className="flex justify-center items-center px-4 py-1.5 bg-gray-400 rounded-md text-white font-semibold cursor-pointer lg:w-5/12 lg:text-sm xl:text-xl xl:w-5/12 "
                  onClick={sendEmail}
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <div>Connect</div>
                  )}
                </div>
                {/* Modal */}
                {isModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-8 rounded-lg">
                      <p className="text-blue-500">
                        Email has been sent to TYN consultant.We will reach you
                        in short span of time
                      </p>
                      <button
                        onClick={closeModal}
                        className="mt-4 bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="border bg-white rounded-md px-4 py-4 shadow-sm">
                {companyData?.startup_overview}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {companyData?.startup_industry && (
              <div className="flex flex-col px-8">
                <div className="font-semibold">Industry: </div>
                <div className="pl-4">{companyData?.startup_industry}</div>
              </div>
            )}
            {companyData?.startup_technology && (
              <div className="flex flex-col px-8">
                <div className="font-semibold">Technology:</div>
                <div className="pl-4">{companyData?.startup_technology}</div>
              </div>
            )}
            {companyData?.startup_country && (
              <div className="flex px-8">
                <div className="font-semibold">Country: </div>
                <div className="pl-2">{companyData?.startup_country}</div>
              </div>
            )}
            {companyData?.startup_company_stage && (
              <div className="flex px-8">
                <div className="font-semibold">Company Stage:</div>
                <div className="pl-2">{companyData?.startup_company_stage}</div>
              </div>
            )}
            {companyData?.startup_url && (
              <div className="flex flex-col px-8">
                <div className="font-semibold">Website:</div>
                <a
                  href={companyData?.startup_url}
                  target="_blank"
                  className="pl-4 underline text-blue-500"
                >
                  {companyData?.startup_url}
                </a>
              </div>
            )}
            {companyData?.startup_description && (
              <div className="flex flex-col px-8">
                <div className="font-semibold">Description:</div>
                <div className="pl-4">{companyData?.startup_description}</div>
              </div>
            )}
            {companyData?.startup_solutions && (
              <div className="flex flex-col px-8">
                <div className="font-semibold">Solutions:</div>
                <div className="pl-4">{companyData?.startup_solutions}</div>
              </div>
            )}
            {companyData?.startup_usecases && (
              <div className="flex flex-col px-8">
                <div className="font-semibold">Usecases:</div>
                <div className="pl-4">{companyData?.startup_usecases}</div>
              </div>
            )}
            {/* {companyData?.startup_founders_info && (
                                    <div className='flex flex-col px-8'>
                                        <div className='font-semibold'>Founders Info</div>
                                        <div className='pl-4'>{companyData?.startup_founders_info}</div>
                                    </div>
                                )}
                                {companyData?.startup_emails && (
                                    <div className='flex flex-col px-8'>
                                        <div className='font-semibold'>Emails</div>
                                        <div className='pl-4'>{companyData?.startup_emails}</div>
                                    </div>
                                )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyProfilePane;
