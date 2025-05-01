{ config, pkgs, ... }:
{
  devshells.default = (
    args: {
      packages = with pkgs; [
        typescript-language-server
        vscode-langservers-extracted
        nodejs_23
        nil
      ];
      packagesFrom = [
        config.treefmt.build.devShell
      ];
    }
  );
}
