import { createQuery, gql } from "@merged/solid-apollo";
import Header from "../components/Header";
import { ErrorBoundary, createSignal } from "solid-js";
import { Navigate } from "@solidjs/router";
import JoinContestButton from "../components/JoinContestButton";
import Status from "../components/Status";
import UserList from "../components/UserList";
import { Modal } from "../components/Modal";
import { createStore } from "solid-js/store";
import jwtManager from "../authentication/jwtManager";

const CONTEST_QUERY = gql`
  query Contest($id: String!) {
    contest(id: $id) {
      name
      status
      drawingParticipations {
        userId
        s3link
        cdnUrl
        user {
          name
        }
      }
    }
  }
`

const fallback = (id: any) => (e: Error) => {
  switch (e.message) {
    case 'You are not authenticated':
      return <Navigate href={`/login?redirect_url=/contest/${id}`} />
    case 'User not registered in this contest':
      return <JoinContestButton contestId={id}/>
    default:
      return <Navigate href="/" />
  }
}

export default function Contest(props: { id: string }) {
  const data = createQuery<{ contest: { name: string, status: string, drawingParticipations: any }}>(CONTEST_QUERY, {
    variables: { id: props.id },
  })

  const getContestName = () => {
    return data()?.contest?.name
  }

  const getUserList = () => {
    const res = data()?.contest?.drawingParticipations
    return res
  }

  const getUserDrawingParticipation = () => {
    const userDrawingParticipation = data()?.contest?.drawingParticipations.find((drawingParticipation: any) => drawingParticipation.userId === getUser().id)
    return userDrawingParticipation
  }

  const getUser = (): { id: string, name: string, email: string } => {
    return JSON.parse(localStorage.getItem('user') || '{}')
  }

  const [uploadModal, setUploadModal] = createSignal(false);

  const [file, setFile] = createSignal()

  function handleImageChange(event: any) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  }

  const submitImage = async () => {
    const token = jwtManager.getToken();

    const uploadedFile = file() as Blob;
    const formData     = new FormData();
    const str          = 'from client';

    console.log(uploadedFile)

    formData.append( 'image', uploadedFile as Blob);
    formData.append( 'str', str );

    const response = await fetch(`http://localhost:8000/upload?contestId=${props.id}`, { // Your POST endpoint
      method: 'POST',
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        // "content-type": uploadedFile.type
      },
      body: formData // This is your file object
    })

    if (response.status === 200) {
      setUploadModal(false)
    } else {
      window.alert('An error occurred while sending your drawing')
    }
  }

  return (
    <>
      <Header />
      <ErrorBoundary fallback={fallback(props.id)}>
      <div class="flex flex-col">
        <section class="flex gap-4 justify-center">
          <h1 class="text-3xl mb-8">Contest : {getContestName()}</h1>
        </section>
        <section class="flex justify-end ">
          <section class="flex w-full flex-col ml-12">
            {!getUserDrawingParticipation()?.s3link && <button class="btn mr-auto" onClick={() => setUploadModal(true)}>Upload your drawing !</button>}
            {uploadModal() && <Modal onClose={() => setUploadModal(false)}>
              <div class="flex flex-col items-center">
                <h1 class="mb-8 text-lg font-medium">Upload your drawing !</h1>
                <input type="file" accept="image/png, image/jpeg" name="file" onChange={handleImageChange}></input>
                <div class="flex mt-8">
                  <button class="btn-cancel mr-4" onClick={() => setUploadModal(false)}>Annuler</button>
                  <button class="btn" onClick={() => submitImage()}>Envoyer</button>
                </div>
              </div></Modal>}
          </section>
          <section class="flex gap-4 flex-col mr-12">
            <Status status={data()?.contest?.status}></Status>
            <UserList drawingParticipations={getUserList()}></UserList>
          </section>
        </section>
      </div>
      </ErrorBoundary>
    </>
  );
}  