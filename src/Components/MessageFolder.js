import React from "react";
import styled from "styled-components";
import { friend} from "../features/messageSlice";
import { useSelector } from "react-redux";
import { selectProfile } from "../features/messageSlice";

import { FolderIcon } from "@heroicons/react/outline";
import moment from 'moment'
function Message({ data, message }) {
  const profile = useSelector(selectProfile);
  const friendData = useSelector(friend)
  const isSelfMess = message.from === profile._id;
  const timeClass = isSelfMess ? "self-time":"friend-time";
  const classN = isSelfMess ? "checkMessage" : "friend-mess"
  return (<Container className={classN}>
      <div className="msg-data">
      {!isSelfMess && <img className="avatar" src={`https://api.chatngay.xyz/avatars/${friendData.avatar}`} alt="" />}
      <a href={`https://api.chatngay.xyz/files/${data.fileName}`}>
        <div className="file-info">
          <FolderIcon />
          <div>{data.originalFilename}</div>
        </div>
      </a>
      </div>
      <p className={timeClass}>{moment(message.createdAt).format("hh:mm")}</p>
    </Container>
  );
}

export default Message;

// const Container = styled.div`
// .avatar {
//   width: 42px;
//   height: 42px;
//   border-radius: 100%;
//   margin-right: 4px;
// }

//   display: flex;
//   align-items: center;
//   margin-bottom: 16px;
//   margin-left: 10px;

//   .file-info {
//     background-color: lightgray;
//     padding: 4px 8px;
//     max-width: 10rem;
//     border-radius: 8px;
//     display: flex;
//     svg {
//       width: 32px;
//       height: 32px;
//       margin-right: 4px;
//     }
//   }
//   img {
//     width: 42px;
//     height: 42px;
//     border-radius: 100%;
//     margin-right: 4px;
//   }
// `;
const Container = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 16px;
.msg-data {
  display: flex;
}
.msg-content {
  padding: 4px 8px;
  background-color: lightgray;
  border-radius: 10px;
}
.friend-time {
  display: block;
  font-size: 10px;
  margin-left: 45px;
}
.self-time {
  display: block;
  font-size: 10px;
}

  .avatar {
    width: 42px;
    height: 42px;
    border-radius: 100%;
    margin-right: 4px;
  }
  
  .file-info {
      background-color: lightgray;
      padding: 4px 8px;
      max-width: 10rem;
      border-radius: 8px;
      display: flex;
      svg {
        width: 32px;
        height: 32px;
        margin-right: 4px;
      }
    }
`;
