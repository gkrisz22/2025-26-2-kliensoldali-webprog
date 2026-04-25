import ProductSheet from "./ProductSheet"

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <span>📊 Webshop</span>
        <span>Középen vagyok</span>
        

        <ProductSheet />
      </div>
    </header>
  )
}

export default Navbar
