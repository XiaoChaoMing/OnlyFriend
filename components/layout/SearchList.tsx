import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { User } from "../../type";
import Image from "next/image";

interface SearchListProp {
  users: User[] | null;
}
const SearchList: React.FC<SearchListProp> = ({ users }) => {
  useEffect(() => {}, [users]);
  if (users) {
    return (
      <div className="flex flex-col gap-3">
        {users.map((user) => {
          return (
            <div key={user.id} className="flex flex-row gap-3">
              <Image
                height={40}
                width={40}
                className=" rounded-full object-cover"
                src={user.Avatar === "test" ? "/avatar.jpg" : user.Avatar}
                alt="avatar"
              />
              <p>
                {user.firstName}_{user.lastName}
              </p>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>can't not find this users !</div>;
  }
};

SearchList.propTypes = {};

export default SearchList;
