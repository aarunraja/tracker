import HttpHelper from "../../helpers/httpHelper";
import {API_URL} from "../../helpers/utility";

class CourseApi {
  static GetEnrolledCourses() {
    let url = API_URL + '/usercourses';
    return HttpHelper.httpRequest( url, 'GET', {} );
  }

  static GetNotEnrolledCourses() {
    let url = API_URL + '/courses';
    return HttpHelper.httpRequest( url, 'GET', {} );
  }

  static EnRollNewCourse( courseId ) {
    let url = API_URL + '/usercourses/enroll/' + courseId;
    return HttpHelper.httpRequest( url, 'PATCH', {} );
  }

  static GetCourseSections( courseId ) {
    let url = API_URL + '/usercourses/' + courseId;
    return HttpHelper.httpRequest( url, 'GET', {} );
  }

  static MarkAsDone( courseId, sectionId ) {
    let url = API_URL + '/usercourses/' + courseId + '/sections/' + sectionId;
    return HttpHelper.httpRequest( url, 'PATCH', {} );
  }
}

export default CourseApi;
