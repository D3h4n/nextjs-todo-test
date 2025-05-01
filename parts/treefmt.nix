{
  treefmt = {
    flakeCheck = false;
    programs = {
      nixfmt = {
        enable = true;
      };
      prettier = {
        enable = true;
      };
    };
    projectRootFile = "flake.nix";
  };
}
