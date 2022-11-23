import React from 'react';
import { MDBContainer, MDBTypography } from 'mdb-react-ui-kit';

const About = () => {
  return (
    <div style={{marginTop:"150PX"}}>
      <MDBContainer>
        <MDBTypography note noteColor="danger">
          Early blogs were simply manually updated components of common
          Websites. In 1995, the "Online Diary" on the Ty, Inc. Web site was
          produced and updated manually before any blogging programs were
          available. Posts were made to appear in reverse chronological order by
          manually updating text-based HTML code using FTP software in real time
          several times a day. To users, this offered the appearance of a live
          diary that contained multiple new entries per day. At the beginning of
          each new day, new diary entries were manually coded into a new HTML
          file, and at the start of each month, diary entries were archived into
          their own folder, which contained a separate HTML page for every day
          of the month. Then, menus that contained links to the most recent
          diary entry were updated manually throughout the site. This text-based
          method of organizing thousands of files served as a springboard to
          define future blogging styles that were captured by blogging software
          developed years later.[16] The evolution of electronic and software
          tools to facilitate the production and maintenance of Web articles
          posted in reverse chronological order made the publishing process
          feasible for a much larger and less technically-inclined population.
          Ultimately, this resulted in the distinct class of online publishing
          that produces blogs we recognize today. For instance, the use of some
          sort of browser-based software is now a typical aspect of "blogging".
          Blogs can be hosted by dedicated blog hosting services, on regular web
          hosting services, or run using blog software.
        </MDBTypography>
      </MDBContainer>
    </div>
  );
}

export default About