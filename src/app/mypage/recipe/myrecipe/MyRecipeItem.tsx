import Image from 'next/image';

// 임시 이미지 불러오기
import profilePic from '../../../../images/profile.jpg';

export default function RecipeItem() {
  return (
    <div className="flex flex-col">
      <Image
        src={profilePic}
        alt="레시피 이미지"
        width={180}
        height={180}
        className="lg:w-[11.25rem] lg:h-[11.25rem] object-cover rounded-lg shadow-image"
      />
      <div className="relative text-center">
        <div className="absolute left-0">
          <label htmlFor="inputCheckBox" className="sr-only"></label>
          <input type="checkbox" name={`option1`} />
        </div>
        <p className="">가지무침 레시피</p>
      </div>
    </div>
  );
}
