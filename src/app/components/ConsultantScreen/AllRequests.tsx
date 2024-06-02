"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { VscTriangleRight, VscTriangleDown } from "react-icons/vsc";

const AllRequests = ({toggleNewlyAdded,newlyAddedOpen, requests, toggleInProgress, inProgressOpen, toggleCompleted, completedOpen }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };

      const statuses = [
        "Yet to Start",
        "GTF Pending",
        "Convo Started",
        "Pitch",
        "Completed",
        "Rejected",
      ];
    return (
      // <div className="p-4 flex flex-col w-full">
      //   <div className="flex flex-row items-center text-2xl text-blue-400 gap-4 mb-4">
      //     <IoIosArrowBack size={23} />
      //     <div>User Request Management - Total Request</div>
      //   </div>
      //   <div className="flex-grow overflow-auto">
      //     <div className="grid grid-cols-7 bg-gray-50 py-3 px-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider rounded-md sticky top-0 z-10">
      //       <div>Request ID</div>
      //       <div>From</div>
      //       <div>Company</div>
      //       <div>When</div>
      //       <div>Use Case</div>
      //       <div>Query Status</div>
      //       <div>Assigned Status</div>
      //     </div>
      //     {requests.map((request, index) => (
      //       <div
      //         key={index}
      //         className="grid grid-cols-7 py-2.5 px-2 text-center text-xs whitespace-nowrap bg-white rounded-lg shadow-md border-gray-100 border-[1px] my-2 "
      //       >
      //         <div className="flex items-center justify-center">
      //           {request?.id}
      //         </div>
      //         <div className="flex items-center justify-center">
      //           {request?.from_user.first_name}
      //         </div>
      //         <div className="flex items-center justify-center">
      //           {request?.to_growthtechfirm.startup_name}
      //         </div>
      //         <div className="flex items-center justify-center">
      //           {request?.created_at}
      //         </div>
      //         <div className="flex items-center justify-center">
      //           {request?.user_query.query}
      //         </div>
      //         <div className="flex items-center justify-center">
      //           <select
      //             className="bg-zinc-300 text-gray-800 py-1 px-2 rounded"
      //             defaultValue={request?.query_status}
      //           >
      //             {statuses.map((status) => (
      //               <option
      //                 key={status}
      //                 value={status}
      //                 className="bg-white rounded-none"
      //               >
      //                 {status}
      //               </option>
      //             ))}
      //           </select>
      //         </div>
      //         <div className="">
      //           <button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={() => setAssignToMeOpen(true)}>
      //             {request?.assignedStatus == null
      //               ? "Assign To me"
      //               : request?.assignedStatus}
      //           </button>
      //           {assignToMeOpen ? (
      //             <>
      //               <div className="flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none">
      //                 <div className="my-6 max-w-3xl">
      //                   {/*content*/}
      //                   <div className="p-4 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
      //                     {/*header*/}
      //                     <div className="flex items-start justify-between px-2 rounded-t">
      //                       <h3 className="text-3xl font-semibold py-2 pb-4">
      //                         Request Detail
      //                       </h3>
      //                       <button
      //                         className="bg-transparent opacity-50 py-1 leading-none font-medium"
      //                         onClick={() => setAssignToMeOpen(false)}
      //                       >
      //                         <span className="text-3xl text-black">
      //                           x
      //                         </span>
      //                       </button>
      //                     </div>

      //                     {/* body */}
      //                     <div className="flex flex-row gap-10">
      //                       <div className="bg-red-500 flex flex-col w-1/2 justify-between">
      //                         <div className="p-2 flex flex-col items-start gap-2">
      //                           <div className="font-medium text-xl text-blue-400">
      //                             Usecase
      //                           </div>
      //                           <div className="text-base break-words">{request?.user_query.query}</div>
      //                         </div>

      //                         <div className="p-2 flex flex-ccol flex-wrap gap-2">
      //                           <div className="font-medium text-xl text-blue-400">
      //                             Growth Tech Firm
      //                           </div>
      //                           <div className="flex gap-2">
      //                             <div className="text-base py-2">The Yellow Network</div>
      //                             <div className="text-sm rounded-xl p-2 bg-yellow-400 font-medium text-white">
      //                               Verified
      //                             </div>
      //                           </div>
      //                           <div></div>
      //                         </div>
      //                       </div>

      //                       <div className="w-1/2 text-xl">
      //                         <div className="flex flex-col gap-4">
      //                           <div>
      //                             <div className="font-medium mb-4 text-blue-400">
      //                               Nifo User
      //                             </div>

      //                             <div className="text-base flex flex-row gap-4">
      //                               <div className="flex flex-col items-start gap-4  font-medium ">
      //                                 <div>User Name</div>
      //                                 <div>User Mail ID</div>
      //                                 <div>User org</div>
      //                               </div>

      //                               <div className="flex flex-col items-start gap-4">
      //                                 <div>Anand</div>
      //                                 <div>anand@abc.com</div>
      //                                 <div>TYN</div>
      //                               </div>
      //                             </div>
      //                           </div>

      //                           <div className="">
      //                             <div className="font-medium mb-4 text-blue-400">
      //                               GTF User
      //                             </div>
      //                             <div className="text-base flex flex-row gap-4 ">
      //                               <div className="flex items-start font-medium flex-col gap-4">
      //                                 <div>SPOC</div>
      //                                 <div>Email</div>
      //                                 <div>Phone Number</div>
      //                                 <div>Firm's Website</div>
      //                               </div>

      //                               <div className="flex flex-col  items-start gap-4">
      //                                 <div>Anand</div>
      //                                 <div>anand@abc.com</div>
      //                                 <div>997868960</div>
      //                                 <div>TYN</div>
      //                               </div>
      //                             </div>
      //                           </div>
      //                         </div>
      //                       </div>
      //                     </div>

      //                     {/*footer*/}
      //                     <div className="flex items-center justify-center gap-10 p-6 rounded-b">
      //                       <button
      //                         className="bg-blue-400 rounded-lg text-lg text-white background-transparent font-bold uppercase px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      //                         type="button"
      //                         onClick={() => setAssignToMeOpen(false)}
      //                       >
      //                         Assign to me
      //                       </button>
      //                       <button
      //                         className="bg-white text-blue-400 rounded-lg text-lg border border-blue-400  font-bold uppercase px-6 py-2 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      //                         type="button"
      //                         onClick={() => setAssignToMeOpen(false)}
      //                       >
      //                         Back
      //                       </button>
      //                     </div>
      //                   </div>
      //                 </div>
      //               </div>
      //               <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      //             </>
      //           ) : null}
      //         </div>
      //       </div>
      //     ))}
      //   </div>
      // </div>
      <div className="p-4 flex flex-col w-full">
        <div className="flex flex-row items-center text-2xl text-blue-400 gap-4 mb-4">
          <IoIosArrowBack size={23} />
          <div>User Request Management - Total Request</div>
        </div>
        <div className="flex-grow overflow-auto">
          <div>
            <div className="flex flex-row items-center text-sm">
              {!newlyAddedOpen ? (
                <div onClick={toggleNewlyAdded} className="cursor-pointer">
                  <VscTriangleRight />
                </div>
              ) : (
                <div onClick={toggleNewlyAdded} className="cursor-pointer">
                  <VscTriangleDown />
                </div>
              )}
              <div>Newly Added</div>
            </div>
            {requests
              .filter((request) => request.query_status === "requested")
              .map((request, index) => (
                <div
                  key={index}
                  className={`grid-cols-7 py-2.5 px-2 text-center text-xs whitespace-nowrap bg-white rounded-lg shadow-md border-gray-100 border-[1px] my-2 ${
                    newlyAddedOpen ? "grid" : "hidden"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {request?.id}
                  </div>
                  <div className="flex items-center justify-center">
                    {request?.from_user.first_name}
                  </div>
                  <div className="flex items-center justify-center">
                    {request?.to_growthtechfirm.startup_name}
                  </div>
                  <div className="flex items-center justify-center">
                    {formatDate(request?.created_at)}
                  </div>
                  <div className="flex items-center justify-center">
                    {request?.user_query.query}
                  </div>
                  <div className="flex items-center justify-center">
                    <select
                      className="bg-zinc-300 text-gray-800 py-1 px-2 rounded"
                      defaultValue={request?.query_status}
                    >
                      {statuses.map((status) => (
                        <option
                          key={status}
                          value={status}
                          className="bg-white rounded-none"
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
          </div>
          <div>
            {requests.filter(
              (request) => request.query_status === "in_progress"
            ).length > 0 && (
              <div className="flex flex-row items-center text-sm">
                {!inProgressOpen ? (
                  <div onClick={toggleInProgress} className="cursor-pointer">
                    <VscTriangleRight />
                  </div>
                ) : (
                  <div onClick={toggleInProgress} className="cursor-pointer">
                    <VscTriangleDown />
                  </div>
                )}
                <div>In Progress</div>
              </div>
            )}

            {requests
              .filter((request) => request.query_status === "in_progress")
              .map((request, index) => (
                <div
                  key={index}
                  className={`grid-cols-7 py-2.5 px-2 text-center text-xs whitespace-nowrap bg-white rounded-lg shadow-md border-gray-100 border-[1px] my-2 ${
                    inProgressOpen ? "grid" : "hidden"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {request?.id}
                  </div>
                  <div className="flex items-center justify-center">
                    {request?.from_user.first_name}
                  </div>
                  <div className="flex items-center justify-center">
                    {request?.to_growthtechfirm.startup_name}
                  </div>
                  <div className="flex items-center justify-center">
                    {formatDate(request?.created_at)}
                  </div>
                  <div className="flex items-center justify-center">
                    {request?.user_query.query}
                  </div>
                  <div className="flex items-center justify-center">
                    <select
                      className="bg-zinc-300 text-gray-800 py-1 px-2 rounded"
                      defaultValue={request?.query_status}
                    >
                      {statuses.map((status) => (
                        <option
                          key={status}
                          value={status}
                          className="bg-white rounded-none"
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
          </div>
          <div>
            {requests.filter((request) => request.query_status === "completed")
              .length > 0 && (
              <div className="flex flex-row items-center text-sm">
                {!completedOpen ? (
                  <div onClick={toggleCompleted} className="cursor-pointer">
                    <VscTriangleRight />
                  </div>
                ) : (
                  <div onClick={toggleCompleted} className="cursor-pointer">
                    <VscTriangleDown />
                  </div>
                )}
                <div>Completed</div>
              </div>
            )}

            {requests
              .filter((request) => request.query_status === "completed")
              .map((request, index) => (
                <div
                  key={index}
                  className={`grid-cols-7 py-2.5 px-2 text-center text-xs whitespace-nowrap bg-white rounded-lg shadow-md border-gray-100 border-[1px] my-2 ${
                    completedOpen ? "grid" : "hidden"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {request?.id}
                  </div>
                  <div className="flex items-center justify-center">
                    {request?.from_user.first_name}
                  </div>
                  <div className="flex items-center justify-center">
                    {request?.to_growthtechfirm.startup_name}
                  </div>
                  <div className="flex items-center justify-center">
                    {formatDate(request?.created_at)}
                  </div>
                  <div className="flex items-center justify-center">
                    {request?.user_query.query}
                  </div>
                  <div className="flex items-center justify-center">
                    <select
                      className="bg-zinc-300 text-gray-800 py-1 px-2 rounded"
                      defaultValue={request?.query_status}
                    >
                      {statuses.map((status) => (
                        <option
                          key={status}
                          value={status}
                          className="bg-white rounded-none"
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

export default AllRequests;