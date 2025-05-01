{ config, pkgs, ... }:
{
  devShells = {
    default = pkgs.mkShell {
      name = "nextjs";
      meta.description = "Development Environment";
      inputsFrom = [
        config.treefmt.build.devShell
      ];
      packages = builtins.attrValues {
        inherit (pkgs)
          typescript-language-server
          nodejs_23
          ;
      };
    };
  };
}
