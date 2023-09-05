export const Modal = ({ children, onClose }: any) => {
  const onModalClose = () => {
    onClose && onClose()
  }

  return (
    <div onClick={onModalClose} class="absolute h-screen w-screen top-0 left-0 flex z-10" style={{ background: 'rgba(0, 0, 0, 0.3)'}}>
      <section onClick={(e) => e.stopPropagation()} class="m-auto bg-white border bg-gray-100 px-4 py-8 sm:px-6 lg:px-8 rounded-md">
        { children }
      </section>
    </div>
  )
}
