// export default function Loading() {
//   return (
//     <div className="animate-pulse">
//       <div>
//         <div className="flex flex-col gap-5 my-[1.875rem]">
//           <div className="flex flex-row items-center lg:gap-[1.875rem] lg:h-[6.25rem]">
//             <Image
//               src={
//                 item.image ? `${API_URL}/${item.image.path}` : '/fallback.png'
//               }
//               width={100}
//               height={100}
//               alt="상품이미지"
//               className="lg:w-[6.25rem] lg:h-[6.25rem] object-cover rounded-lg shadow-image"
//             ></Image>
//             <div className="flex flex-col justufy-center">
//               <p className="lg:text-base font-semibold">
//                 <span className=" mr-1">{item.name}</span>
//                 <span className="lg:text-xs font-medium mr-2.5">
//                   {' '}
//                   ({item.extra?.details})
//                 </span>
//                 <span>{item.quantity}</span>
//                 <span>개</span>
//               </p>
//               <p>
//                 <span className="lg:text-sm">
//                   {item.price * item.quantity}원
//                 </span>
//               </p>
//             </div>
//           </div>
//         </div>
//         <table className="w-full text-center border-collapse table-fixed mb-10">
//           <thead>
//             <tr>
//               <th className="border border-l-0 py-3 bg-disable-gray font-normal">
//                 주문 금액
//               </th>
//               <th className="border py-3 bg-disable-gray font-normal">
//                 적립금 사용
//               </th>
//               <th className="border py-3 bg-disable-gray font-normal">
//                 배송비
//               </th>
//               <th className="border border-r-0 py-3 bg-disable-gray font-normal">
//                 결제 예상 금액
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="border border-l-0 relative py-4">
//                 <span>{total.toLocaleString()}</span>
//                 <PlusCircle className="text-black fill-white absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
//               </td>
//               <td className="border relative py-4">
//                 <span className="font-semibold">0</span>
//                 <MinusCircle className="text-black fill-white absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
//               </td>
//               <td className="border relative py-4">
//                 <span className="font-semibold">무료배송</span>
//                 <Circle className="text-black fill-white absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
//                 <CircleEqual className="text-black  absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
//               </td>
//               <td className="border border-r-0 relative py-4">
//                 <span className="font-semibold text-dark-red">
//                   {total.toLocaleString()}
//                 </span>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <form action={orderAction} onSubmit={handleClientValidation}>
//         <input
//           type="hidden"
//           name="accessToken"
//           value={user?.token?.accessToken ?? ''}
//         />
//         <input type="hidden" name="products" value={JSON.stringify(products)} />
//         <input
//           type="hidden"
//           name="user"
//           value={userFormData ? JSON.stringify(userFormData) : ''}
//         />
//         <input type="hidden" name="total" value={res.cost?.total} />
//         <div className="flex flex-col lg:flex-row justify-between gap-[2rem]">
//           <div className="flex flex-col gap-[0.625rem] w-[31.25rem]">
//             <h3 className="lg:text-xl font-bold mb-[0.75rem]">주문자 정보</h3>
//             <hr className="text-light-gray w-full mb-[1.5rem]" />
//             <div>
//               <div className="flex items-center justify-between mb-[0.625rem]">
//                 <div className="flex items-center">
//                   <label
//                     className="block text-black lg:text-base"
//                     htmlFor="name1"
//                   >
//                     주문자 이름
//                   </label>
//                   <span className="text-light-red lg:text-sm ml-1">*</span>
//                 </div>
//                 <div className="flex flex-col">
//                   <Input
//                     width="md"
//                     type="text"
//                     id="name"
//                     autoComplete="name"
//                     placeholder="이름을 입력하세요"
//                     defaultValue={user?.name ?? ''}
//                     {...register('name', {
//                       required: '이름를 입력해주세요',
//                     })}
//                   />
//                   {errors.name && (
//                     <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
//                       {errors.name.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between mb-[0.625rem]">
//                 <div className="flex items-center">
//                   <label
//                     className="block text-black lg:text-base"
//                     htmlFor="phone"
//                   >
//                     주문자 연락처
//                   </label>
//                   <span className="text-light-red lg:text-sm ml-1">*</span>
//                 </div>
//                 <div className="flex flex-col">
//                   <Input
//                     width="md"
//                     type="text"
//                     id="phone"
//                     autoComplete="tel"
//                     placeholder="전화번호를 입력하세요"
//                     defaultValue={user?.phone ?? ''}
//                     {...register('phone', {
//                       required: '전화번호를 입력해주세요',
//                       pattern: {
//                         value: /^[0-9-]+$/,
//                         message: '숫자와 하이픈(-)만 입력 가능합니다',
//                       },
//                     })}
//                   />
//                   {errors.phone && (
//                     <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
//                       {errors.phone.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex lg:gap-[1.25rem] w-full items-start">
//                 <div className="flex items-center pt-[0.375rem] min-w-[9.35rem]">
//                   <label
//                     className="block text-black lg:text-base"
//                     htmlFor="address"
//                   >
//                     배송지 정보
//                   </label>
//                   <span className="text-light-red lg:text-sm lg:ml-1">*</span>
//                 </div>

//                 <div className="flex flex-col lg:gap-[0.625rem] lg:w-[20.625rem] mb-[0.625rem]">
//                   <div className="flex lg:gap-[0.625rem] items-center">
//                     <Input
//                       width="xs"
//                       type="text"
//                       id="postcode"
//                       placeholder="우편번호"
//                       disabled
//                       defaultValue={user?.postcode ?? ''}
//                       {...register('postcode', {
//                         required: '우편번호를 입력해주세요',
//                         pattern: {
//                           value: /^[0-9-]+$/,
//                           message: '숫자와 하이픈(-)만 입력 가능합니다',
//                         },
//                       })}
//                     />
//                     {errors.postcode && (
//                       <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
//                         {errors.postcode.message}
//                       </p>
//                     )}

//                     <button
//                       type="button"
//                       className="lg:w-[4rem] lg:h-[1.875rem] lg:border-[0.0938rem] border-light-gray lg:rounded-[0.3125rem] lg:text-xs text-light-gray lg:hover:border-[.125rem]"
//                       onClick={() => setIsOpen(true)}
//                     >
//                       우편번호
//                     </button>
//                   </div>
//                   <Input
//                     width="md"
//                     type="text"
//                     id="addressdetail1"
//                     placeholder="상세주소를 입력하세요"
//                     defaultValue={user?.addressDetail1 ?? ''}
//                     {...register('addressDetail1', {
//                       required: '상세주소를 입력해주세요',
//                     })}
//                   />
//                   {errors.addressDetail1 && (
//                     <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
//                       {errors.addressDetail1.message}
//                     </p>
//                   )}

//                   <Input
//                     width="md"
//                     type="text"
//                     id="addressDetail2"
//                     defaultValue={user?.addressDetail2 ?? ''}
//                     {...register('addressDetail2', {
//                       required: '상세주소를 입력해주세요',
//                     })}
//                   />
//                   {errors.addressDetail1 && (
//                     <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
//                       {errors.addressDetail1.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <label
//                   className="block text-black lg:text-base"
//                   htmlFor="message"
//                 >
//                   배송 메세지
//                 </label>
//                 <Input
//                   width="md"
//                   type="text"
//                   id="message"
//                   placeholder="배송 전 연락주세요"
//                   name="message"
//                 />
//               </div>
//               {/* 주소 검색 모달창 */}
//               {isOpen && (
//                 <div
//                   style={{
//                     position: 'fixed',
//                     top: '25%',
//                     width: '450px',
//                     height: '500px',
//                     zIndex: 100,
//                     boxShadow: '0 0 8px rgba(0,0,0,0.3)',
//                   }}
//                 >
//                   {/* PostCode - 카카오 우편번호 검색 서비스를 사용하는 리액트용 컴포넌트 */}
//                   <PostCode
//                     style={{ width: '100%', height: '100%' }} // 닫기 버튼 최하단 위치
//                     onComplete={handleComplete} //주소 정보(zonecode, address)를 넘겨줌
//                   />

//                   {/* 모달 닫기 버튼 */}
//                   <button
//                     onClick={() => setIsOpen(false)}
//                     style={{
//                       width: '100%',
//                       padding: '0.5rem',
//                       boxShadow: '0 0 8px rgba(0,0,0,0.3)',
//                       background: '#eee',
//                       cursor: 'pointer',
//                     }}
//                   >
//                     닫기
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="flex flex-col justify-between">
//             <>
//               <input type="hidden" name="payment" value={payment} />
//               <div className="flex flex-col gap-[0.625rem] w-[31.25rem]">
//                 <h3 className="lg:text-xl font-bold mb-[0.75rem]">결제 수단</h3>
//                 <hr className="text-light-gray w-full mb-[1.5rem]" />
//                 <div>
//                   <fieldset>
//                     <div className="mb-4">
//                       <label className="mr-[2.125rem]">
//                         <input
//                           type="radio"
//                           name="contact"
//                           id="내 통장 결제"
//                           value="내 통장 결제"
//                           className="mr-2"
//                           checked={payment === '내 통장 결제'}
//                           onChange={handleChange}
//                         />
//                         <span>내 통장 결제</span>
//                       </label>

//                       <label>
//                         <input
//                           type="radio"
//                           name="contact"
//                           id="계좌 이체"
//                           value="계좌 이체"
//                           className="mr-2"
//                           checked={payment === '계좌 이체'}
//                           onChange={handleChange}
//                         />
//                         <span>계좌 이체</span>
//                       </label>
//                     </div>
//                     <div className="mb-4">
//                       <label>
//                         <input
//                           type="radio"
//                           name="contact"
//                           id="신용/체크카드"
//                           value="신용/체크카드"
//                           className="mr-2"
//                           checked={payment === '신용/체크카드'}
//                           onChange={handleChange}
//                         />
//                         <span>신용/체크카드</span>
//                       </label>
//                     </div>
//                     <div className="flex flex-row mb-4">
//                       <label className="flex flex-row items-center mr-[2.125rem]">
//                         <input
//                           type="radio"
//                           name="contact"
//                           id="카카오페이"
//                           value="카카오페이"
//                           className="mr-2"
//                           checked={payment === '카카오페이'}
//                           onChange={handleChange}
//                         />
//                         <Image
//                           src={kakaopay}
//                           alt="카카오페이"
//                           width={74}
//                           height={29}
//                           className="mr-2"
//                         />
//                         <span>카카오페이</span>
//                       </label>
//                       <label className="flex flex-row items-center mr-[2.125rem]">
//                         <input
//                           type="radio"
//                           name="contact"
//                           id="네이버페이"
//                           value="네이버페이"
//                           className="mr-2"
//                           checked={payment === '네이버페이'}
//                           onChange={handleChange}
//                         />
//                         <Image
//                           src={naverpay}
//                           alt="카카오페이"
//                           width={74}
//                           height={27}
//                           className="mr-2"
//                         />
//                         <span>네이버페이</span>
//                       </label>
//                     </div>
//                     <div>
//                       <label className="flex flex-row items-center mr-[2.125rem]">
//                         <input
//                           type="radio"
//                           name="contact"
//                           id="토스페이"
//                           value="토스페이"
//                           className="mr-2"
//                           checked={payment === '토스페이'}
//                           onChange={handleChange}
//                         />
//                         <Image
//                           src={tosspay}
//                           alt="토스페이"
//                           width={29}
//                           height={29}
//                           className="mr-2"
//                         />
//                         <span>토스페이</span>
//                       </label>
//                     </div>
//                   </fieldset>
//                 </div>
//               </div>
//             </>
//             <p className="font-semibold text-lg">
//               총금액 :{' '}
//               <span className="text-dark-red text-5xl font-bold">
//                 {(res.cost?.total ?? 0).toLocaleString()}
//               </span>
//               원
//             </p>
//           </div>
//         </div>
//         <div className="flex justify-center mt-20 mb-[6.25rem]">
//           <Button size="xxl" variant="green">
//             결제하기
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }
