import styled from "styled-components";
// import GenerateImageForm from "../components/GenerateImageForm";
// import GeneratedImageCard from "../components/GeneratedImageCard";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { generateImage, postImage } from "../API/api";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  max-width: 1200px;
  gap: 8%;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;
const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Actions = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
`;

const ContainerImage = styled.div`
  flex: 1;
  min-height: 300px;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 2px dashed ${({ theme }) => theme.yellow};
  color: ${({ theme }) => theme.arrow + 80};
  border-radius: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
  background: ${({ theme }) => theme.black + 50};
`;

function CreatePost() {
  const [author, setAuthor] = useState("");
  const [prompt, setPrompt] = useState("");

  const navigate = useNavigate();

  const {
    data: generateImageData,
    error: generateImageError,
    isError: generateImageIsError,
    isPending: generateImageIsPending,
    isSuccess: generateImageIsSuccess,
    mutate: generateImageMutate,
  } = useMutation({
    mutationFn: (prompt) => generateImage(prompt),
  });

  const {
    data: postImageData,
    error: postImageError,
    isError: postImageIsError,
    isPending: postImageIsPending,
    isSuccess: postImageIsSuccess,
    mutate: postImageMutate,
  } = useMutation({
    mutationFn: (body) => postImage(body),
    onSuccess: () => {
      navigate("/");
    },
  });

  function handleGenerateImage() {
    generateImageMutate(prompt);
  }

  function handlePostImage() {
    const body = {
      name: author,
      prompt,
      photo: `data:image/jpeg;base64,${generateImageData?.data?.photo}`,
    };
    postImageMutate(body);
  }

  return (
    <Container>
      <Wrapper>
        <Form>
          <Top>
            <Title>generate image with promt</Title>
            <Desc>Write your promt to generate image</Desc>
          </Top>
          <Body>
            <TextInput
              label="Author"
              placeholder="Enter your name"
              value={author}
              handelChange={(e) => setAuthor(e.target.value)}
            />
            <TextInput
              label="Prompt"
              placeholder="Enter your Promt"
              rows="8"
              value={prompt}
              handelChange={(e) => setPrompt(e.target.value)}
            />
            **You can post the image to the community
            {postImageIsError && (
              <div style={{ color: "red" }}>
                {" "}
                {postImageError?.response?.data?.message}
              </div>
            )}
          </Body>
          <Actions>
            <Button
              text="Generate Image"
              flex="flex"
              leftIcon={<AutoAwesome />}
              onClick={handleGenerateImage}
              isLoading={generateImageIsPending}
              isDisabled={author === "" || prompt === ""}
            />
            <Button
              text="Post Image"
              flex="flex"
              type="secondary"
              leftIcon={<CreateRounded />}
              onClick={handlePostImage}
              isLoading={postImageIsPending}
              isDisabled={author === "" || prompt === "" || !generateImageData}
            />
          </Actions>
        </Form>
        <ContainerImage>
          {generateImageIsPending ? (
            <>
              <CircularProgress
                style={{ color: "inherit", width: "24px", height: "24px" }}
              />
              Generating Your Image ...
            </>
          ) : (
            <>
              {generateImageIsSuccess ? (
                <Image
                  src={`data:image/jpeg;base64,${generateImageData?.data?.photo}`}
                />
              ) : (
                <>Write a prompt to generate image </>
              )}
            </>
          )}
        </ContainerImage>{" "}
      </Wrapper>
    </Container>
  );
}

export default CreatePost;
