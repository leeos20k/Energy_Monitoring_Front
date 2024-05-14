import { observable } from "mobx";
export { authStore };

const authStore = observable({
  orgId: 0,
  userId: 0,
  adminFlag: "",
  systemFlag: "",
  appTp: "",
  userNm: "",
  hpNo: "",
  comments: "",
  orgNm: "",
  authenticated: false,

  reIssueAccessToken(accessToken) {
    this.accessToken = accessToken;
  },

  setAuthInfo(data) {
    this.orgId = data.orgId;
    this.userId = data.userId;
    this.adminFlag = data.adminFlag;
    this.systemFlag = data.systemFlag;
    this.appTp = data.appTp;
    this.userNm = data.userNm;
    this.hpNo = data.hpNo;
    this.comments = data.comments;
    this.orgNm = data.orgNm;
    this.authenticated = true;
  },

  removeAuthInfo() {
    this.orgId = 0;
    this.userId = 0;
    this.adminFlag = "";
    this.systemFlag = "";
    this.appTp = "";
    this.userNm = "";
    this.hpNo = "";
    this.comments = "";
    this.orgNm = "";
    this.authenticated = false;
  },
});
